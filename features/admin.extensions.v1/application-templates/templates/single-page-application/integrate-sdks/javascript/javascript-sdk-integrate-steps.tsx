/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { IdentifiableComponentInterface } from "@thiva/core/models";
import { Code, CodeEditor, Heading, Text } from "@thiva/react-components";
import React, { Fragment, FunctionComponent, ReactElement, ReactNode } from "react";
import { Divider } from "semantic-ui-react";
import { javascriptSDKInitialisationCode, javascriptSDKIntegrationCode, loginButtonCode } from "./code-blocks";
import {
    VerticalStepper,
    VerticalStepperStepInterface
} from "../../../../../components/component-extensions";
import { SDKInitConfig } from "../../../../shared";
import { SDKMeta } from "../../meta";

/**
 * Interface for the JavaScript SDK Integrate steps component props.
 */
interface JavaScriptSDKIntegrateStepsPropsInterface extends IdentifiableComponentInterface {
    /**
     * Component for callback URL selection when there's multiple configured.
     * @param {ReactNode} heading Heading for the config options section.
     */
    configurationOptions: (heading: ReactNode) => ReactElement;
    /**
     * Product name from config. ex: Asgardeo.
     */
    productName: string;
    /**
     * The config that the SDK is initialized with.
     */
    sdkConfig: SDKInitConfig;
}

/**
 * JavaScript SDK Integrate steps.
 *
 * TODO: Add Localization. https://github.com/wso2-enterprise/asgardeo-product/issues/7033
 *
 * @param {JavaScriptSDKIntegrateStepsPropsInterface} props - Props injected into the component.
 * @return {React.ReactElement}
 */
export const JavaScriptSDKIntegrateSteps: FunctionComponent<JavaScriptSDKIntegrateStepsPropsInterface> = (
    props: JavaScriptSDKIntegrateStepsPropsInterface
): ReactElement => {

    const {
        configurationOptions,
        sdkConfig,
        ["data-componentid"]: testId
    } = props;

    /**
     * Render SDK Installation instruction steps.
     * @return {ReactNode}
     */
    const renderSDKInstallInstructions = (): ReactNode => {

        return (
            <>
                <Text>
                    There are two ways that you can integrate the <Code>@asgardeo/auth-spa</Code> SDK to your{ " " }
                    JavaScript application. Pick one of the following approaches based on your requirement.
                </Text>

                <Heading as="h4">Load from a CDN</Heading>

                <Text>
                    You can pull down the <Code>@asgardeo/auth-spa</Code> SDK from the <Code>unpkg</Code>{ " " }
                    content delivery network (CDN).
                </Text>

                <div className="code-segment">
                    <CodeEditor
                        oneLiner
                        readOnly
                        withClipboardCopy
                        language="htmlmixed"
                        sourceCode={ `<script src="${ SDKMeta.javascript.cdn }"></script>` }
                    />
                </div>

                <Heading as="h4">Install using a package manager</Heading>

                <Text>
                    You can also install the <Code>@asgardeo/auth-spa</Code> package from <Code>npm</Code> or{ " " }
                    <Code>yarn</Code> package manager.
                </Text>

                <div className="code-segment">
                    <CodeEditor
                        oneLiner
                        readOnly
                        withClipboardCopy
                        language="javascript"
                        sourceCode={ SDKMeta.javascript.npmInstallCommand }
                    />
                </div>
            </>
        );
    };

    /**
     * Render Auth Client configuration instructions.
     * @return {ReactNode}
     */
    const renderAuthClientConfigurationInstructions = (): ReactNode => {

        if (!sdkConfig) {
            return null;
        }

        const renderConfigurationOptions = () => {

            const heading = (
                <Text>
                    To initialize the SDK, use the <Code>getInstance()</Code> function in the SDK and pass in{ " " }
                    the required configurations to the <Code>auth.initialize()</Code> function.
                </Text>
            );

            return configurationOptions(heading);
        };


        return (
            <>
                <Text>
                    Copy and use the following code within the root file of your project{ " " }
                    <Code>E.g., index.html</Code> to configure <Code>AsgardeoSPAClient</Code> for your application.
                </Text>

                <Divider hidden />
                { renderConfigurationOptions() }
                <Divider hidden />

                <div className="code-segment">
                    <CodeEditor
                        height={ "100%" }
                        showLineNumbers
                        withClipboardCopy
                        language="javascript"
                        sourceCode={
                            javascriptSDKInitialisationCode({
                                clientID: sdkConfig.clientID,
                                scope: sdkConfig.scope,
                                baseUrl: sdkConfig?.baseUrl,
                                signInRedirectURL: sdkConfig.signInRedirectURL,
                                signOutRedirectURL: sdkConfig.signOutRedirectURL
                            })
                        }
                        options={ {
                            lineWrapping: true
                        } }
                        theme="dark"
                        readOnly
                    />
                </div>
            </>
        );
    };

    /**
     * Render adding Login instructions.
     * @return {ReactNode}
     */
    const renderLoginInstructions = (): ReactNode => {

        return (
            <>
                <Text>
                    The created instance of the SDK could be used to access the session state that contains{ " " }
                    information such as the email address of the authenticated user and the methods that are{ " " }
                    required for implementing authentication.
                </Text>

                <Heading as="h4">Add a Login Button</Heading>

                <Text>
                    We can call the <Code>signIn()</Code> function using the created instance to easily{ " " }
                    implement a <strong>login button</strong>.
                </Text>

                <div className="code-segment">
                    <CodeEditor
                        oneLiner
                        readOnly
                        withClipboardCopy
                        language="javascript"
                        sourceCode={ loginButtonCode() }
                    />
                </div>

                <Text spaced="top">
                    Similarly to the above step, we can use the <Code>signOut()</Code> function to implement a{ " " }
                    <strong>logout button</strong>.
                </Text>

                <Heading as="h4">Show Authenticated User&apos;s Information</Heading>

                <Text>
                    The following code snippet demonstrates the process of accesing the authenticated user&apos;s{ " " }
                    information together with other functions from the SDK.
                </Text>

                <div className="code-segment">
                    <CodeEditor
                        height={ "100%" }
                        showLineNumbers
                        withClipboardCopy
                        language="javascript"
                        sourceCode={ javascriptSDKIntegrationCode() }
                        options={ {
                            lineWrapping: true
                        } }
                        theme="dark"
                        readOnly
                    />
                </div>
            </>
        );
    };

    /**
     * Steps.
     * @return {VerticalStepperStepInterface[]}
     */
    const steps: VerticalStepperStepInterface[] = [
        {
            stepContent: renderSDKInstallInstructions(),
            stepTitle: "Install SDK"
        },
        {
            stepContent: renderAuthClientConfigurationInstructions(),
            stepTitle: (
                <Fragment>
                    Configure <Code>AsgardeoSPAClient</Code>
                </Fragment>
            )
        },
        {
            stepContent: renderLoginInstructions(),
            stepTitle: "Use API"
        }
    ];

    return (
        <Fragment>
            <VerticalStepper
                alwaysOpen
                isSidePanelOpen
                isNextEnabled={ true }
                stepContent={ steps }
                data-testid={ `${ testId }-vertical-stepper` }
            />
        </Fragment>
    );
};

/**
 * Default props for the component
 */
JavaScriptSDKIntegrateSteps.defaultProps = {
    "data-componentid": "react-sdk-integrate-steps"
};
