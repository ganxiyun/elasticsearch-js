// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildRollupStopJob (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [rollup.stop_job]() request
   *
   * @param {string} id - The ID of the job to stop
   * @param {boolean} wait_for_completion - True if the API should block until the job has fully stopped, false if should be executed async. Defaults to false.
   * @param {time} timeout - Block for (at maximum) the specified duration while waiting for the job to stop.  Defaults to 30s.
   */

  const acceptedQuerystring = [
    'wait_for_completion',
    'timeout'
  ]

  const snakeCase = {
    waitForCompletion: 'wait_for_completion'

  }

  return function rollupStopJob (params, options, callback) {
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
    if (params['id'] == null) {
      const err = new ConfigurationError('Missing required parameter: id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_rollup' + '/' + 'job' + '/' + encodeURIComponent(id) + '/' + '_stop'

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildRollupStopJob
