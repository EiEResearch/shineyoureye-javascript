import { google } from 'googleapis';
import { env } from 'api/helper';
import logger from 'api/logger';

class Sheets {
  constructor() {
    this.sheets = google.sheets({
      version: 'v4',
      auth: env.googleSheetKey,
    });

    this.params = {
      spreadsheetId: env.googleSheetId,
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  sheetId($sheet) {
    const sheet = ($sheet) ? $sheet.toLowerCase() : '';

    switch (sheet) {
      case 'senator':
      case 'senators':
      case 'senate':
        return env.senateSheet;
      case 'representative':
      case 'representatives':
        return env.representativesSheet;
      case 'governor':
      case 'governors':
        return env.governorsSheet;
      case 'honorables':
      case 'honorable':
        return env.honorablesSheet;
      case 'all':
        return [env.governorsSheet, env.senateSheet, env.representativesSheet, env.honorablesSheet];
      default:
        return [];
    }
  }

  async get(name) {
    try {
      const params = { ...this.params };
      params.ranges = this.sheetId(name);

      const { data } = await this.sheets.spreadsheets.values.batchGet(params);
      return data;
    } catch (error) {
      logger(error);
    }
  }
}

export default new Sheets();
