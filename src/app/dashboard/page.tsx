import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import ClientDashboard from './ClientDashboard';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return <ClientDashboard session={session} />;
}
