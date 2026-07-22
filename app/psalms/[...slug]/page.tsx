import { permanentRedirect } from 'next/navigation';

interface Props {
  params: {
    slug: string[];
  };
}

/**
 * Legacy Psalms reading URLs, now served from /ot/psalms.
 */
export default function LegacyPsalmsPage({ params }: Props) {
  permanentRedirect(`/ot/psalms/${params.slug.join('/')}`);
}
