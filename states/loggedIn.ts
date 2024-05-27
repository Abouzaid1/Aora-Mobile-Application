import { create } from 'zustand'
type userStore = {
    isLoggedIn: boolean,
    user: any
    loggedIn: (isLoggedIn: boolean) => void,
    currentUser: (user: any) => void
}
const useStore = create<userStore>((set) => ({
    isLoggedIn: false,
    user: {},
    loggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
    currentUser: (user) => set(() => ({ user })),
}))

export default useStore;