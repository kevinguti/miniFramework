import * as fs from 'fs';
import * as path from 'path';

export class Logger {
  private static instance: Logger;
  private logFile: string;
  private consoleLog: boolean;

  constructor(logToConsole: boolean = true) {
    this.consoleLog = logToConsole;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFile = path.join(process.cwd(), 'logs', `playwright-test-${timestamp}.log`);
    
    // Crear directorio logs si no existe
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private writeToFile(message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    fs.appendFileSync(this.logFile, logMessage, 'utf8');
  }

  public info(message: string): void {
    const logMessage = `[INFO] ${message}`;
    if (this.consoleLog) {
      console.log(logMessage);
    }
    this.writeToFile(logMessage);
  }

  public error(message: string): void {
    const logMessage = `[ERROR] ${message}`;
    if (this.consoleLog) {
      console.error(logMessage);
    }
    this.writeToFile(logMessage);
  }

  public warn(message: string): void {
    const logMessage = `[WARN] ${message}`;
    if (this.consoleLog) {
      console.warn(logMessage);
    }
    this.writeToFile(logMessage);
  }

  public debug(message: string): void {
    const logMessage = `[DEBUG] ${message}`;
    if (this.consoleLog) {
      console.debug(logMessage);
    }
    this.writeToFile(logMessage);
  }

  // Métodos específicos para logging de requests/responses como en tu ejemplo
  public logNavigation(url: string, status?: string): void {
    const domain = new URL(url).hostname;
    this.info(`NAVIGATION - Domain: ${domain}`);
    this.debug(`REQUEST URL: ${url}`);
    if (status) {
      this.info(`NAVIGATION STATUS: ${status}`);
    }
  }

  public logFormSubmission(formData: any, success: boolean): void {
    this.info(`FORM SUBMISSION - Success: ${success}`);
    this.debug(`FORM DATA: ${JSON.stringify(formData, null, 2)}`);
  }

  public logElementInteraction(action: string, selector: string, value?: string): void {
    this.debug(`ELEMENT INTERACTION - Action: ${action}, Selector: ${selector}${value ? `, Value: ${value}` : ''}`);
  }
}

// Exportar instancia única
export const logger = Logger.getInstance();