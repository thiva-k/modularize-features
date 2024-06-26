/**
 * Copyright (c) 2019, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { IdentifiableComponentInterface, TestableComponentInterface } from "@thiva/core/models";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { getWidgetIcons } from "../../../configs";
import { AppConstants, CommonConstants } from "../../../constants";
import { history } from "../../../helpers";
import { SettingsSection } from "../../shared";

type ConsentManagementWidgetPropsInterface = TestableComponentInterface & IdentifiableComponentInterface;

/**
 * Consent management widget.
 *
 * @param props - Props injected to the component.
 * @returns Consent Management Widget.
 */
export const ConsentManagementWidget: FunctionComponent<ConsentManagementWidgetPropsInterface> = (
    props: ConsentManagementWidgetPropsInterface
): ReactElement => {

    const { ["data-testid"]: testId } = props;
    const { t } = useTranslation();

    const navigate = () => {
        history.push(AppConstants.getPaths().get("SECURITY") + "#" + CommonConstants.CONSENTS_CONTROL);
    };

    return (
        <div className="widget consent-management" data-testid={ testId }>
            <SettingsSection
                className="overview"
                data-testid={ `${testId}-settings-section` }
                header={ t("myAccount:components.overview.widgets.consentManagement.header") }
                description={ t("myAccount:components.overview.widgets.consentManagement.description") }
                primaryAction={ t("myAccount:components.overview.widgets.consentManagement.actionTitles.manage") }
                onPrimaryActionClick={ navigate }
                icon={ getWidgetIcons().consents }
                iconMini={ getWidgetIcons().consents }
                iconSize="x60"
                iconStyle="twoTone"
            />
        </div>
    );
};

/**
 * Default props of {@link ConsentManagementWidget}
 */
ConsentManagementWidget.defaultProps = {
    "data-testid": "consent-management-overview-widget"
};
