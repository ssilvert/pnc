/*
 * JBoss, Home of Professional Open Source.
 * Copyright 2014 Red Hat, Inc., and individual contributors
 * as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

(function () {

  var module = angular.module('pnc.configuration');

  /**
   * @ngdoc directive
   * @name pnc.configuration:pncRunningPanel
   * @restrict E
   * @param {number=} pnc-configuration-id
   * The id of the BuildConfiguration to display builds for.
   * @description
   * Displays a panel with running builds of the given BuildConfiguration.
   * @example
      <pnc-running-panel pnc-configuration-id="4"></pnc-running-panel>
   * @author Alex Creasy
   */
  module.directive('pncRunningPanel', [
    function () {

      function PncRunningPanelCtrl($log, $scope, RunningBuildRecordDAO, eventTypes) {
        $scope.page = RunningBuildRecordDAO.getPagedByConfiguration({
          configurationId: $scope.pncConfigurationId
        });

        function update(event, payload) {
          $log.debug('PncRunningPanelCtrl::update >> event = %O, payload = %O', event, payload);
          if (payload.buildConfigurationId === $scope.pncConfigurationId) {
            $scope.page.reload();
          }
        }

        $scope.$on(eventTypes.BUILD_STARTED, update);
        $scope.$on(eventTypes.BUILD_FINISHED, update);
      }

      return {
        restrict: 'E',
        templateUrl: 'configuration/directives/pnc-running-panel/pnc-running-panel.html',
        scope: {
          pncConfigurationId: '='
        },
        controller: PncRunningPanelCtrl
      };
    }
  ]);

})();
