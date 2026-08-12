import { registerAs } from '@nestjs/config';

export default registerAs('azureAgent', () => ({
  endpoint: process.env.AZURE_AGENT_PROJECT_ENDPOINT,
  agentName: process.env.AZURE_AGENT_NAME,
  agentVersion: process.env.AZURE_AGENT_VERSION,
}));
