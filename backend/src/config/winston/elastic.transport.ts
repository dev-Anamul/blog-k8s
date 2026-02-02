/* eslint-disable prettier/prettier */
import { ElasticsearchTransformer, ElasticsearchTransport } from 'winston-elasticsearch';

export const elasticTransports = new ElasticsearchTransport({
  level: 'info',
  transformer: (logData) => {
    const transformed = ElasticsearchTransformer(logData);
    return transformed;
  },
  indexPrefix: 'isp-benefit-logs',
  clientOpts: { node: 'http://host.docker.internal:9200' },
});
