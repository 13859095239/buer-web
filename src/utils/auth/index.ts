/**
 * 用户工具类
 *
 * @author zoulan
 * @since 2023-05-22
 */
import type { USER_ID_KEY } from '/@/settings/cacheSetting';
import {
  TOKEN_KEY,
  USER_NAME_KEY,
  USER_ROLES_KEY,
  USER_TENANT_ID_KEY,
  USER_USERNAME_KEY
} from '/@/settings/cacheSetting';
import { createLocalStorage } from '/@/utils/cache';

const ls = createLocalStorage();
interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_ID_KEY]: string;
  [USER_USERNAME_KEY]: string;
  [USER_NAME_KEY]: string;
  [USER_TENANT_ID_KEY]: string;
  [USER_ROLES_KEY]: string[];
}
export function getToken() {
  return ls.get(TOKEN_KEY);
}
export function getUserInfo<T>(key: keyof BasicStore): T {
  return ls.get(key) as T;
}
export function setAuthCache(key: keyof BasicStore, value: any) {
  ls.set(key, value);
}
export function removeAuthCache(key: keyof BasicStore) {
  ls.remove(key);
}
export function clearAuthCache() {
  removeAuthCache(TOKEN_KEY);
  removeAuthCache(USER_NAME_KEY);
  removeAuthCache(USER_ROLES_KEY);
  removeAuthCache(USER_USERNAME_KEY);
  removeAuthCache(USER_TENANT_ID_KEY);
}
