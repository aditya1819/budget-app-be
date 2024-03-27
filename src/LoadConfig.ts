import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export const getSecrets = async () => {
  const secret_name = 'test/mongoPassword';

  const client = new SecretsManagerClient({
    region: 'ap-south-1',
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
      }),
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = response.SecretString;

  return {
    mongoPassword: secret.mongoAtlasPassword,
  };
};
