import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAdminContent, saveAdminContent } from '@/api/adminApi'
import { adminToast } from '@/lib/adminToast'

type SaveToast = 'live' | 'deploy' | 'default'

export function useAdminContent<T extends object>({
  key,
  queryKey,
  empty,
  normalize,
  saveToast = 'deploy',
}: {
  key: string
  queryKey: string[]
  empty: () => T
  normalize?: (data: T) => T
  saveToast?: SaveToast
}) {
  const queryClient = useQueryClient()

  const menuQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await fetchAdminContent<T>(key)
      return normalize ? normalize(data) : data
    },
    refetchOnWindowFocus: false,
  })

  const setLocal = useCallback(
    (updater: (prev: T) => T) => {
      queryClient.setQueryData<T>(queryKey, (old) => updater(old ?? empty()))
    },
    [queryClient, queryKey, empty],
  )

  const notifySaved = useCallback(() => {
    if (saveToast === 'live') adminToast.savedLive()
    else if (saveToast === 'deploy') adminToast.savedDeploy()
    else adminToast.saved()
  }, [saveToast])

  const saveMutation = useMutation({
    mutationFn: async (data: T) => {
      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      } as T
      await saveAdminContent(key, payload)
    },
    onSuccess: () => {
      notifySaved()
      void queryClient.invalidateQueries({ queryKey })
      void queryClient.invalidateQueries({ queryKey: ['public'] })
    },
    onError: (error: Error) => {
      adminToast.error(error.message || 'Uložení selhalo.')
    },
  })

  return {
    menuQuery,
    data: menuQuery.data ?? empty(),
    setLocal,
    saveMutation,
  }
}
