// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetRecords (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.get_records](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-record.html) request
   *
   * @param {string} job_id -
   * @param {boolean} exclude_interim - Exclude interim results
   * @param {int} from - skips a number of records
   * @param {int} size - specifies a max number of records to get
   * @param {string} start - Start time filter for records
   * @param {string} end - End time filter for records
   * @param {double} record_score -
   * @param {string} sort - Sort records by a particular field
   * @param {boolean} desc - Set the sort direction
   * @param {object} body - Record selection criteria
   */

  const acceptedQuerystring = [
    'exclude_interim',
    'from',
    'size',
    'start',
    'end',
    'record_score',
    'sort',
    'desc'
  ]

  const snakeCase = {
    excludeInterim: 'exclude_interim',
    recordScore: 'record_score'

  }

  return function mlGetRecords (params, options, callback) {
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
    if (params['job_id'] == null && params['jobId'] == null) {
      const err = new ConfigurationError('Missing required parameter: job_id or jobId')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'records'

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

module.exports = buildMlGetRecords
