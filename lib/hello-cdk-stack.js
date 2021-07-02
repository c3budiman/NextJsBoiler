const core = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');

class HelloCdkStack extends core.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new s3.Bucket(this, 'NextJsBoiler', {
      versioned: true,
      removalPolicy: core.RemovalPolicy.DESTROY,
      accessControl: 'Private',
      publicReadAccess: true,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['POST'],
          allowedOrigins: ['*'],
        },
      ],
    });
  }
}

module.exports = { HelloCdkStack };
