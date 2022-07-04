import type { PageReference } from 'lwr/navigation';

/**
 * A basic pub-sub mechanism for sibling component communication
 *
 * TODO - adopt standard flexipage sibling communication mechanism when it's available.
 */

interface ThisContext {
    pageRef: PageReference;
}

interface Listener {
    callback: (data: any) => void;
    thisCtx: ThisContext;
}

const events: { [key: string]: Listener[] } = {};

/**
 * Confirm that two page references have the same attributes
 * @param {object} pageRef1 - The first page reference
 * @param {object} pageRef2 - The second page reference
 */
const samePageRef = (pageRef1: PageReference, pageRef2: PageReference) => {
    const obj1 = pageRef1.attributes;
    const obj2 = pageRef2.attributes;

    return Object.keys(obj1)
        .concat(Object.keys(obj2))
        .every((key) => {
            return obj1[key] === obj2[key];
        });
};

/**
 * Registers a callback for an event
 * @param {string} eventName - Name of the event to listen for.
 * @param {function} callback - Function to invoke when said event is fired.
 * @param {object} thisCtx - The value to be passed as the this parameter to the callback function is bound.
 */
const registerListener = (
    eventName: string,
    callback: (data: any) => void,
    thisCtx: ThisContext
) => {
    // Checking that the listener has a pageRef property. We rely on that property for filtering purpose in fireEvent()
    if (!thisCtx.pageRef) {
        throw new Error('pubsub listeners need a "@wire(CurrentPageReference) pageRef" property');
    }

    if (!events[eventName]) {
        events[eventName] = [];
    }

    const duplicate = events[eventName].find((listener) => {
        return listener.callback === callback && listener.thisCtx === thisCtx;
    });

    if (!duplicate) {
        events[eventName].push({ callback, thisCtx: thisCtx });
    }
};

/**
 * Unregisters a callback for an event
 * @param {string} eventName - Name of the event to unregister from.
 * @param {function} callback - Function to unregister.
 * @param {object} thisCtx - The value to be passed as the this parameter to the callback function is bound.
 */
const unregisterListener = (
    eventName: string,
    callback: (data: any) => void,
    thisCtx: ThisContext
) => {
    if (events[eventName]) {
        events[eventName] = events[eventName].filter(
            (listener) => listener.callback !== callback || listener.thisCtx !== thisCtx
        );
    }
};

/**
 * Unregisters all event listeners bound to an object.
 * @param {object} thisCtx - All the callbacks bound to this object will be removed.
 */
const unregisterAllListeners = (thisCtx: ThisContext) => {
    Object.keys(events).forEach((eventName) => {
        events[eventName] = events[eventName].filter((listener) => listener.thisCtx !== thisCtx);
    });
};

/**
 * Fires an event to listeners.
 * @param {object} pageRef - Reference of the page that represents the event scope.
 * @param {string} eventName - Name of the event to fire.
 * @param {*} payload - Payload of the event to fire.
 */
const fireEvent = (pageRef: PageReference, eventName: string, payload: any) => {
    if (events[eventName]) {
        const listeners = events[eventName];

        listeners.forEach((listener) => {
            if (samePageRef(pageRef, listener.thisCtx.pageRef)) {
                try {
                    listener.callback.call(listener.thisCtx, payload);
                } catch (error) {
                    // fail silently
                }
            }
        });
    }
};

export { registerListener, unregisterListener, unregisterAllListeners, fireEvent };
