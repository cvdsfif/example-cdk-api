import { App } from "aws-cdk-lib";
import { ExampleCdkApiStack } from "../lib/example-cdk-api-stack";
import { Match, Template } from "aws-cdk-lib/assertions";

describe("Testing the example CDK stack creation and connectivity", () => {
    test("The template should create an API and connect it to a Postgres database", () => {
        const app = new App();
        const stack = new ExampleCdkApiStack(app, "CDKAppTestStack", {
            deployFor: "test"
        })
        const template = Template.fromStack(stack);
        const layers = template.findResources("AWS::Lambda::LayerVersion")
        expect(Object.keys(layers).length).toEqual(1)

        template.hasResourceProperties("AWS::RDS::DBInstance",
            Match.objectLike({
                "DBName": "TestDatabase",
                "Engine": "postgres"
            })
        )
    })
})