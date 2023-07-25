function uid() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0];
}

function transformCallback(callback, once) {
    const identifier = uid();
    const prop = `_${identifier}`;
    Object.defineProperty(window, prop, {
        value: (result) => {
            if (once) {
                Reflect.deleteProperty(window, prop);
            }
            return callback === null || callback === void 0 ? void 0 : callback(result);
        },
        writable: false,
        configurable: true
    });
    return identifier;
}

async function invoke(cmd, args = {}) {
    return new Promise((resolve, reject) => {
        const callback = transformCallback((e) => {
            resolve(e);
            Reflect.deleteProperty(window, `_${error}`);
        }, true);
        const error = transformCallback((e) => {
            reject(e);
            Reflect.deleteProperty(window, `_${callback}`);
        }, true);
        window.__TAURI_IPC__(Object.assign({
            cmd,
            callback,
            error
        }, args));
    });
}

window.__TAURI_IPC__ = (message) => window.ipc.postMessage(JSON.stringify(message))

Notification = class Notification {
    static permission = "default"

    constructor(title, options = {}) {
        invoke(
            'tauri',
            {
                __tauriModule: 'Notification',
                message: {
                    cmd: 'notification',
                    options: {
                        title: title,
                        ...options
                    }
                }
            }
        )
    }

    static async requestPermission() {
        const response = invoke(
            'tauri',
            {
                __tauriModule: 'Notification',
                message: {
                    cmd: 'requestNotificationPermission'
                }
            }
        )
        Notification.permission = response;
        return response;
    }
}

setTimeout(async () => {
    const response = await invoke(
        'tauri',
        {
            __tauriModule: 'Notification',
            message: {
                cmd: 'isNotificationPermissionGranted'
            }
        }
    )
    if (response) {
        Notification.permission = "granted"
    } else {
        Notification.permission = "denied"
    }
}, 1000)