export const getStorage = (key) => {
  return localStorage.getItem(key);
};

export const setStorage = (key, val) => {
  localStorage.setItem(key, val);
};

export const deleteStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

export function getUserMenus() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("user_custom_menus")) || [];
}

export function addUserMenu(newMenu) {
  const current = getUserMenus();
  localStorage.setItem(
    "user_custom_menus",
    JSON.stringify([...current, newMenu])
  );
}