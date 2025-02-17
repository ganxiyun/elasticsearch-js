// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildDataFrameStopDataFrameTransform (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [data_frame.stop_data_frame_transform](https://www.elastic.co/guide/en/elasticsearch/reference/current/stop-data-frame-transform.html) request
   *
   * @param {string} transform_id - The id of the transform to stop
   * @param {boolean} wait_for_completion - Whether to wait for the transform to fully stop before returning or not. Default to false
   * @param {time} timeout - Controls the time to wait until the transform has stopped. Default to 30 seconds
   * @param {boolean} allow_no_match - Whether to ignore if a wildcard expression matches no data frame transforms. (This includes `_all` string or when no data frame transforms have been specified)
   */

  const acceptedQuerystring = [
    'wait_for_completion',
    'timeout',
    'allow_no_match'
  ]

  const snakeCase = {
    waitForCompletion: 'wait_for_completion',
    allowNoMatch: 'allow_no_match'
  }

  return function dataFrameStopDataFrameTransform (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // check required parameters
    if (params['transform_id'] == null && params['transformId'] == null) {
      const err = new ConfigurationError('Missing required parameter: transform_id or transformId')
      return handleError(err, callback)
    }
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, transformId, transform_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_data_frame' + '/' + 'transforms' + '/' + encodeURIComponent(transform_id || transformId) + '/' + '_stop'

    // build request object
    const request = {
      method,
      path,
      body: '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildDataFrameStopDataFrameTransform
