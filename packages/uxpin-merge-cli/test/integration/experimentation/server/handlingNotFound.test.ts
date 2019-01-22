import { NOT_FOUND } from 'http-status-codes';
import { Response } from 'request';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server – handling not found path', () => {
  const { request } = setupExperimentationServerTest({
    serverCmdArgs: [
      '--uxpin-api-domain "0.0.0.0:7448"',
    ],
  });

  it('Responds with NOT_FOUND status code', async () => {
    // when
    const response:Response = await request('/nonexistent/path', { simple: false, resolveWithFullResponse: true });

    // then
    expect(response.statusCode).toEqual(NOT_FOUND);
    expect(response.body).toEqual('Not found');
  });
});
