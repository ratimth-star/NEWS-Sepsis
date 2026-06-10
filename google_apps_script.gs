const SPREADSHEET_ID = "1-5qgqP6a4Od_Q-MQDLx3f6NZG9ODDII8O803d7KYra8";
const SHEET_NAME = "NEWS_DATA";
const SEPSIS_SHEET_NAME = "sepsis";
const SATISFACTION_SHEET_NAME = "Satisfaction Assessment Form";

function doGet(e) {
  const params = getParams_(e);
  const sheet = getTargetSheet_(params.sheetName);

  if (String(params.mode || "").toLowerCase() === "sepsis") {
    return jsonResponse(getSepsisResponse_(getTargetSheet_(SEPSIS_SHEET_NAME), params));
  }

  if (String(params.mode || "").toLowerCase() === "history") {
    return jsonResponse(getHistoryResponse_(sheet, params));
  }

  return jsonResponse({
    ok: true,
    message: "NEWS Google Apps Script is running",
    spreadsheetId: SPREADSHEET_ID,
    sheet: sheet.getName(),
    headers: getHeaders_(sheet)
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000);

    const payload = parsePayload(e);
    const sheet = getTargetSheet_(payload.sheetName);
    const headers = getHeaders_(sheet);

    Logger.log(JSON.stringify({
      spreadsheetId: SPREADSHEET_ID,
      sheet: sheet.getName(),
      payload: payload,
      headers: headers
    }));

    if (String(payload.mode || "").toLowerCase() === "login") {
      return jsonResponse(loginAdmin_(payload));
    }

    if (String(payload.mode || "").toLowerCase() === "delete") {
      if (String(payload.recordType || "").toLowerCase() === "sepsisprotocol") {
        const deletedSepsisRow = deleteSepsisProtocolRow_(sheet, headers, payload);

        return jsonResponse({
          ok: true,
          deleted: true,
          row: deletedSepsisRow,
          sheet: sheet.getName()
        });
      }

      const deletedRow = deleteRow_(sheet, headers, payload);

      return jsonResponse({
        ok: true,
        deleted: true,
        row: deletedRow,
        sheet: sheet.getName()
      });
    }

    if (String(payload.mode || "").toLowerCase() === "update") {
      const updatedRow = updateRow_(sheet, headers, payload);

      return jsonResponse({
        ok: true,
        updated: true,
        row: updatedRow,
        sheet: sheet.getName(),
        savedAt: payload.savedAt || new Date().toISOString()
      });
    }

    if (String(payload.recordType || "").toLowerCase() === "sepsisprotocol") {
      const upsertedRow = upsertRowByKeys_(sheet, headers, payload, ["caseId", "historyRecordKey"]);

      return jsonResponse({
        ok: true,
        upserted: true,
        row: upsertedRow,
        sheet: sheet.getName(),
        savedAt: payload.savedAt || new Date().toISOString()
      });
    }

    const row = headers.map(header => normalizeValue_(payload[header]));
    sheet.appendRow(row);

    return jsonResponse({
      ok: true,
      appended: true,
      sheet: sheet.getName(),
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error && error.message ? error.message : error)
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {}
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("Missing request body");
  }

  const raw = e.postData.contents.trim();
  if (!raw) {
    throw new Error("Empty request body");
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error("Invalid JSON payload");
  }
}

function getParams_(e) {
  return (e && e.parameter) ? e.parameter : {};
}

function getTargetSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const requestedName = String(sheetName || SHEET_NAME).trim();
  const allowedSheets = [SHEET_NAME, SEPSIS_SHEET_NAME, SATISFACTION_SHEET_NAME];
  const allowedName = allowedSheets.indexOf(requestedName) !== -1 ? requestedName : SHEET_NAME;
  const sheet = spreadsheet.getSheetByName(allowedName);

  if (!sheet) {
    throw new Error("Sheet not found: " + allowedName);
  }

  return sheet;
}

function getHeaders_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0]
    .map(String)
    .map(value => value.trim());

  const hasHeaders = headers.some(Boolean);
  if (!hasHeaders) {
    throw new Error("Header row is empty. Please add sheet headers in row 1 first.");
  }

  return headers;
}

function loginAdmin_(payload) {
  var props = getAdminConfig_();
  var username = String(payload.username || "").trim();
  var password = String(payload.password || "");

  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  if (username !== props.username || password !== props.password) {
    throw new Error("Invalid username or password");
  }

  var expiresAt = Date.now() + (6 * 60 * 60 * 1000);
  return {
    ok: true,
    username: username,
    token: createToken_(username, expiresAt, props.secret),
    expiresAt: expiresAt
  };
}

function getAdminConfig_() {
  var props = PropertiesService.getScriptProperties();
  var username = String(props.getProperty("ADMIN_USERNAME") || "").trim();
  var password = String(props.getProperty("ADMIN_PASSWORD") || "");
  var secret = String(props.getProperty("ADMIN_SECRET") || "").trim();

  if (!username || !password || !secret) {
    throw new Error("Admin properties are not configured");
  }

  return {
    username: username,
    password: password,
    secret: secret
  };
}

function createToken_(username, expiresAt, secret) {
  var body = Utilities.base64EncodeWebSafe(JSON.stringify({
    username: username,
    expiresAt: expiresAt
  }));
  var signature = signText_(body, secret);
  return body + "." + signature;
}

function verifyToken_(token) {
  var props = getAdminConfig_();
  var parts = String(token || "").split(".");
  if (parts.length !== 2) {
    throw new Error("Invalid token");
  }

  var body = parts[0];
  var signature = parts[1];
  var expectedSignature = signText_(body, props.secret);
  if (signature !== expectedSignature) {
    throw new Error("Invalid token");
  }

  var payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(body)).getDataAsString());
  if (!payload.expiresAt || Date.now() > Number(payload.expiresAt)) {
    throw new Error("Token expired");
  }

  return payload;
}

function signText_(text, secret) {
  var bytes = Utilities.computeHmacSha256Signature(text, secret);
  return Utilities.base64EncodeWebSafe(bytes).replace(/=+$/, "");
}

function updateRow_(sheet, headers, payload) {
  var match = payload.match || {};
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    throw new Error("No data rows available for update");
  }

  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
  var rowIndex = values.findIndex(function(row) {
    var item = headers.reduce(function(record, header, index) {
      record[header] = row[index];
      return record;
    }, {});

    return String(item.savedAt || "") === String(match.savedAt || "")
      && normalizeDigits_(item.hn) === normalizeDigits_(match.hn)
      && String(item.assessmentTime || "") === String(match.assessmentTime || "");
  });

  if (rowIndex === -1) {
    throw new Error("Matching history row not found for update");
  }

  var rowNumber = rowIndex + 2;
  var nextRow = headers.map(function(header) {
    return normalizeValue_(payload[header]);
  });

  sheet.getRange(rowNumber, 1, 1, headers.length).setValues([nextRow]);
  return rowNumber;
}

function upsertRowByKeys_(sheet, headers, payload, keyHeaders) {
  var lastRow = sheet.getLastRow();
  var keys = keyHeaders.filter(function(header) {
    return headers.indexOf(header) !== -1 && String(payload[header] || "").trim();
  });
  var rowNumber = -1;

  if (lastRow > 1 && keys.length) {
    var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
    var rowIndex = values.findIndex(function(row) {
      var item = headers.reduce(function(record, header, index) {
        record[header] = row[index];
        return record;
      }, {});

      return keys.some(function(header) {
        return String(item[header] || "") === String(payload[header] || "");
      });
    });

    if (rowIndex !== -1) {
      rowNumber = rowIndex + 2;
    }
  }

  var nextRow = headers.map(function(header) {
    return normalizeValue_(payload[header]);
  });

  if (rowNumber === -1) {
    sheet.appendRow(nextRow);
    return sheet.getLastRow();
  }

  sheet.getRange(rowNumber, 1, 1, headers.length).setValues([nextRow]);
  return rowNumber;
}

function deleteRow_(sheet, headers, payload) {
  verifyToken_(payload.token);

  var match = payload.match || {};
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    throw new Error("No data rows available for delete");
  }

  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
  var rowIndex = values.findIndex(function(row) {
    var item = headers.reduce(function(record, header, index) {
      record[header] = row[index];
      return record;
    }, {});

    return String(item.savedAt || "") === String(match.savedAt || "")
      && normalizeDigits_(item.hn) === normalizeDigits_(match.hn)
      && String(item.assessmentTime || "") === String(match.assessmentTime || "");
  });

  if (rowIndex === -1) {
    throw new Error("Matching history row not found for delete");
  }

  var rowNumber = rowIndex + 2;
  sheet.deleteRow(rowNumber);
  return rowNumber;
}

function deleteSepsisProtocolRow_(sheet, headers, payload) {
  var lastRow = sheet.getLastRow();
  var caseId = String(payload.caseId || "").trim();
  var historyRecordKey = String(payload.historyRecordKey || "").trim();

  if (!caseId && !historyRecordKey) {
    throw new Error("Missing sepsis caseId or historyRecordKey");
  }

  if (lastRow <= 1) {
    return 0;
  }

  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
  var rowIndex = values.findIndex(function(row) {
    var item = headers.reduce(function(record, header, index) {
      record[header] = row[index];
      return record;
    }, {});

    return (caseId && String(item.caseId || "").trim() === caseId)
      || (historyRecordKey && String(item.historyRecordKey || "").trim() === historyRecordKey);
  });

  if (rowIndex === -1) {
    return 0;
  }

  var rowNumber = rowIndex + 2;
  sheet.deleteRow(rowNumber);
  return rowNumber;
}

function getHistoryResponse_(sheet, params) {
  const headers = getHeaders_(sheet);
  const lastRow = sheet.getLastRow();
  const limit = Math.max(1, Math.min(Number(params.limit) || 100, 500));

  if (lastRow <= 1) {
    return {
      ok: true,
      items: [],
      total: 0,
      filters: {
        date: params.date || "",
        hn: params.hn || "",
        location: params.location || "",
        levelKey: params.levelKey || "",
        red: params.red || ""
      }
    };
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, headers.length).getDisplayValues();
  const items = rows
    .map(function(row) {
      return headers.reduce(function(record, header, index) {
        record[header] = row[index];
        return record;
      }, {});
    })
    .filter(function(item) {
      return matchesHistoryFilters_(item, params);
    })
    .sort(function(a, b) {
      return getSortTime_(b) - getSortTime_(a);
    })
    .slice(0, limit);

  return {
    ok: true,
    items: items,
    total: items.length,
    filters: {
      date: params.date || "",
      hn: params.hn || "",
      location: params.location || "",
      levelKey: params.levelKey || "",
      red: params.red || ""
    }
  };
}

function getSepsisResponse_(sheet, params) {
  const headers = getHeaders_(sheet);
  const lastRow = sheet.getLastRow();
  const limit = Math.max(1, Math.min(Number(params.limit) || 500, 500));

  if (lastRow <= 1) {
    return {
      ok: true,
      item: null,
      items: [],
      total: 0
    };
  }

  const rows = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  const items = rows
    .map(function(row) {
      return headers.reduce(function(record, header, index) {
        record[header] = row[index];
        return record;
      }, {});
    })
    .filter(function(item) {
      return matchesSepsisFilters_(item, params);
    })
    .sort(function(a, b) {
      return getSepsisSortTime_(b) - getSepsisSortTime_(a);
    })
    .slice(0, limit);

  return {
    ok: true,
    item: items[0] || null,
    items: items,
    total: items.length
  };
}

function matchesSepsisFilters_(item, params) {
  var caseId = String(params.caseId || "").trim();
  var historyRecordKey = String(params.historyRecordKey || "").trim();
  var hn = normalizeDigits_(params.hn);
  var startDateTime = String(params.startDateTime || "").trim();
  var dateFrom = String(params.dateFrom || "").trim();
  var dateTo = String(params.dateTo || "").trim();
  var location = String(params.location || "").trim();

  if (caseId && String(item.caseId || "").trim() === caseId) return true;
  if (historyRecordKey && String(item.historyRecordKey || "").trim() === historyRecordKey) return true;
  if (hn && normalizeDigits_(item.patientHn).indexOf(hn) !== -1) {
    if (!startDateTime) return true;
    return String(item.startDateTime || "").indexOf(startDateTime.slice(0, 16)) === 0;
  }

  if (caseId || historyRecordKey || hn || startDateTime) return false;

  if (dateFrom || dateTo) {
    var itemDate = extractDate_(item.startDateTime || item.updatedAt || item.savedAt || item.createdAt || "");
    if (dateFrom && itemDate < dateFrom) return false;
    if (dateTo && itemDate > dateTo) return false;
  }

  if (location && String(item.assessmentLocation || "").trim() !== location) {
    return false;
  }

  return true;
}

function getSepsisSortTime_(item) {
  var value = item.startDateTime || item.assessmentTime || item.updatedAt || item.savedAt || item.createdAt || "";
  return parseDateTimeValue_(value);
}

function matchesHistoryFilters_(item, params) {
  var selectedDate = String(params.date || "").trim();
  var selectedHn = normalizeDigits_(params.hn);
  var selectedLocation = String(params.location || "").trim();
  var selectedLevelKey = String(params.levelKey || "").trim();
  var selectedRed = String(params.red || "").trim().toLowerCase();
  var dateFrom = String(params.dateFrom || "").trim();
  var dateTo = String(params.dateTo || "").trim();

  if (selectedDate) {
    var itemDate = extractDate_(item.assessmentTime || item.savedAt || "");
    if (itemDate !== selectedDate) return false;
  }

  if (dateFrom || dateTo) {
    var rangeDate = extractDate_(item.assessmentTime || item.savedAt || "");
    if (dateFrom && rangeDate < dateFrom) return false;
    if (dateTo && rangeDate > dateTo) return false;
  }

  if (selectedHn) {
    var itemHn = normalizeDigits_(item.hn);
    if (itemHn.indexOf(selectedHn) === -1) return false;
  }

  if (selectedLocation && String(item.location || "").trim() !== selectedLocation) {
    return false;
  }

  if (selectedLevelKey && String(item.levelKey || "").trim() !== selectedLevelKey) {
    return false;
  }

  if (selectedRed) {
    var itemRed = String(item.red || "").trim().toLowerCase();
    if (itemRed !== selectedRed) return false;
  }

  return true;
}

function extractDate_(value) {
  var text = String(value || "").trim();
  var directMatch = text.match(/^(\d{4}-\d{2}-\d{2})/);
  if (directMatch) return directMatch[1];

  var time = parseDateTimeValue_(value);
  if (!time) return "";
  var date = new Date(time);
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
}

function parseDateTimeValue_(value) {
  if (!value) return 0;
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return isNaN(value.getTime()) ? 0 : value.getTime();
  }

  var text = String(value || "").trim();
  if (!text) return 0;

  var directDate = new Date(text);
  if (!isNaN(directDate.getTime())) return directDate.getTime();

  var monthMap = {
    "มค": 0, "มกราคม": 0,
    "กพ": 1, "กุมภาพันธ์": 1,
    "มีค": 2, "มีนาคม": 2,
    "เมย": 3, "เมษายน": 3,
    "พค": 4, "พฤษภาคม": 4,
    "มิย": 5, "มิถุนายน": 5,
    "กค": 6, "กรกฎาคม": 6,
    "สค": 7, "สิงหาคม": 7,
    "กย": 8, "กันยายน": 8,
    "ตค": 9, "ตุลาคม": 9,
    "พย": 10, "พฤศจิกายน": 10,
    "ธค": 11, "ธันวาคม": 11
  };
  var thaiMatch = text.match(/(\d{1,2})\s+([^\s\d]+)\s+(\d{4})(?:\s+(\d{1,2})[:.](\d{2}))?/);
  if (!thaiMatch) return 0;

  var day = Number(thaiMatch[1]);
  var monthKey = String(thaiMatch[2] || "").replace(/\./g, "").trim();
  var month = monthMap[monthKey];
  var year = Number(thaiMatch[3]);
  var hours = Number(thaiMatch[4] || 0);
  var minutes = Number(thaiMatch[5] || 0);
  if (year > 2400) year -= 543;
  if (month === undefined || isNaN(day) || isNaN(year) || isNaN(hours) || isNaN(minutes)) return 0;

  return new Date(year, month, day, hours, minutes, 0, 0).getTime();
}

function getSortTime_(item) {
  var value = item.assessmentTime || item.savedAt || "";
  var date = new Date(value);
  return isNaN(date.getTime()) ? 0 : date.getTime();
}

function normalizeDigits_(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeValue_(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function testAppendRow() {
  const sheet = getTargetSheet_();
  const headers = getHeaders_(sheet);
  const sample = {
    location: "TEST",
    hn: "000000000",
    assessmentTime: new Date().toISOString(),
    respiratoryRate: "0",
    spo2: "0",
    oxygenSupport: "0",
    temperature: "0",
    systolicBP: "0",
    heartRate: "0",
    consciousness: "0",
    spo2Scale: "1",
    score: "0",
    level: "Test",
    levelKey: "Test",
    red: "false",
    savedAt: new Date().toISOString()
  };

  const row = headers.map(header => normalizeValue_(sample[header]));
  sheet.appendRow(row);

  return {
    ok: true,
    appended: true,
    sheet: sheet.getName()
  };
}
