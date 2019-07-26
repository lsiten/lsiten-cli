import { getAll } from './rc';
import downloadGit from 'download-git-repo';
import {DEFAULTS} from '../config/constants'

export const downloadLocal = async (templateName, projectName) => {
    let config = await getAll();
    let api = `${config.registry || DEFAULTS.registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        downloadGit(api, projectName, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}