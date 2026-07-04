import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import { clearAdminSession, getAdminToken, verifyToken } from '@/api/adminApi'
import { AdminLoading } from '@/components/admin/ui'

type Props = {
  children: React.ReactNode
}

export function AdminGuard({ children }: Props) {
  const hasToken = typeof sessionStorage !== 'undefined' && !!getAdminToken()

  const query = useQuery({
    queryKey: ['admin', 'verify-token'],
    queryFn: async () => {
      await verifyToken()
      return true
    },
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  if (!hasToken) {
    return <Navigate to="/admin/login" replace />
  }

  if (query.isLoading) {
    return <AdminLoading message="Ověřuji přihlášení…" />
  }

  if (query.isError) {
    clearAdminSession()
    return <Navigate to="/admin/login" replace />
  }

  return children
}
