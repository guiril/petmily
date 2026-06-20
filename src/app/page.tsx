import { redirect } from 'next/navigation';
import { AVAILABLE_CITIES } from '@/lib/cities';

export default function Home() {
  redirect(`/${AVAILABLE_CITIES[0].key}`);
}
