import xhr from 'xhr';

/**
 * Save a project JSON to the project server.
 * This should eventually live in scratch-www.
 * @param {number} projectId the ID of the project, null if a new project.
 * @param {*} vmState the SB3 project representation.
 * @param {object} params the request params.
 * @property {?number} params.originalId the original project ID if a copy/remix.
 * @property {?boolean} params.isCopy a flag indicating if this save is creating a copy.
 * @property {?boolean} params.isRemix a flag indicating if this save is creating a remix.
 * @property {?string} params.title the title of the project.
 * @property {?string} params.saveTo Where to save.
 * @return {Promise} A promise that resolves when the network request resolves.
 */
export default function (projectId, vmState, params) {
    const opts = {
        body: vmState,
        // If we set json:true then the body is double-stringified, so don't
        headers: {
            'Content-Type': 'application/octet-stream'
        },
		method: "put",
		url: params.saveTo,
        withCredentials: false
    };
    return new Promise((resolve, reject) => {
        xhr(opts, (err, response) => {
            if (err) return reject(err);
            if (response.statusCode !== 200) return reject(response.statusCode);
            resolve();
        });
    });
}
