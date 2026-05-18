'use client';

import { redirect, useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();
  redirect(`/catalog/${id}`);
}
