const WISHLIST_KEY = "nayapurana-wishlist";
const WISHLIST_CHANGE_EVENT = "nayapurana-wishlist-change";

export function getWishlistIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedWishlist = window.localStorage.getItem(WISHLIST_KEY);
    const parsedWishlist = storedWishlist
      ? JSON.parse(storedWishlist)
      : [];

    return Array.isArray(parsedWishlist)
      ? parsedWishlist.filter((id) => typeof id === "string")
      : [];
  } catch (error) {
    console.error("Unable to load wishlist:", error);
    return [];
  }
}

export function saveWishlistIds(ids) {
  try {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
  } catch (error) {
    console.error("Unable to save wishlist:", error);
  }
}

export function subscribeToWishlistChanges(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(WISHLIST_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
  };
}
