// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatNodes (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [cat.nodes](https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-nodes.html) request
   *
   * @param {string} format - a short version of the Accept header, e.g. json, yaml
   * @param {boolean} full_id - Return the full node ID instead of the shortened version (default: false)
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {list} h - Comma-separated list of column names to display
   * @param {boolean} help - Return help information
   * @param {list} s - Comma-separated list of column names or column aliases to sort by
   * @param {boolean} v - Verbose mode. Display column headers
   */

  const acceptedQuerystring = [
    'format',
    'full_id',
    'local',
    'master_timeout',
    'h',
    'help',
    's',
    'v',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    fullId: 'full_id',
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function catNodes (params, options, callback) {
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
    var { method, body, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_cat' + '/' + 'nodes'

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildCatNodes
