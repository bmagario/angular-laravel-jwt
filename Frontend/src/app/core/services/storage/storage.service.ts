// Libraries
import { Injectable } from '@angular/core';

/**
 * Service to manage web storage.
 *
 * @export
 */
@Injectable()
export class StorageService {

  /**
   * Get item from storage.
   *
   * @param key Item key
   * @returns Item value
   */
  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  /**
   * Save item into storage.
   *
   * @param key Item key
   * @param value Item value
   */
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Remove item from storage.
   *
   * @param key Item key
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clear all local storage data.
   *
   */
  clear() {
    localStorage.clear();
  }
}
