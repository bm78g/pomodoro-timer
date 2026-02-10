import { headers } from 'next/headers'
import TimerDashboard from './ui/TimerDashboard/TimerDashboard'

import { auth } from '@/app/lib/auth'

export default async function App() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <TimerDashboard signedIn={session != null} username={session?.user.name}/>
}
