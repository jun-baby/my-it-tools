import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.url-params-to-json.title'),
  path: '/url-params-to-json',
  description: translate('tools.url-params-to-json.description'),
  keywords: ['url', 'json', 'url-param'],
  component: () => import('./url-params-to-json.vue'),
  icon: Braces,
});
