import { permanentRedirect } from 'next/navigation';

interface Props {
  params: {
    slug: string[];
  };
}

/**
 * Legacy Genesis reading URLs, now served from /ot/genesis.
 */
export default function LegacyGenesisPage({ params }: Props) {
  permanentRedirect(`/ot/genesis/${params.slug.join('/')}`);
}
