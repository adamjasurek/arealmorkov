import toast from 'react-hot-toast'

export const adminToast = {
  saved(message = 'Uloženo.') {
    toast.success(message, { duration: 4000 })
  },
  savedLive(message = 'Uloženo — změna je na webu hned vidět.') {
    toast.success(message, { duration: 4000 })
  },
  savedDeploy(message = 'Uloženo — na webu se projeví do cca 1 minuty.') {
    toast.success(message, { duration: 5000 })
  },
  error(message: string) {
    toast.error(message, { duration: 5000 })
  },
}
