import { Construct } from 'constructs';
import { ExtendedStackProps, TSApiConstruct, TSApiDatabaseProperties, TSApiPlainProperties } from "cdk-typescript-lib";
import { CfnOutput, Stack } from 'aws-cdk-lib';
import { simpleApiS } from './shared/simple-api';
import { ApiDefinition } from 'typizator';
import { IHostedZone } from 'aws-cdk-lib/aws-route53';

export type ExampleStackProps = ExtendedStackProps & {
  customDomainLookup?: <T extends ApiDefinition>(
    scope: Construct,
    props: TSApiPlainProperties<T> | TSApiDatabaseProperties<T>,
    customPath: string) => IHostedZone
}

export class ExampleCdkApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ExampleStackProps) {
    super(scope, id, props)

    const mainConstruct = new TSApiConstruct(this, "ExampleCdkApiStack", {
      ...props,
      apiName: "ExampleCdkApi",
      description: "Example CDK API",
      apiMetadata: simpleApiS.metadata,
      lambdaPath: "lambda",
      extraBundling: {
        minify: false,
        externalModules: [
          "json-bigint", "typizator", "typizator-handler"
        ]
      },
      connectDatabase: false
    })

    new CfnOutput(this, `ApiURL`, { value: mainConstruct.apiUrl })
  }
}
