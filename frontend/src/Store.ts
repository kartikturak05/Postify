import { create } from "zustand";

// Define the state type
interface BlogStoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create Zustand store with TypeScript
const useBlogStore = create<BlogStoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

 export default useBlogStore;