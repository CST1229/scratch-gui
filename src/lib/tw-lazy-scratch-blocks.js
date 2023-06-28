let _ScratchBlocks = null;
let _WasNameYourmom = false;

// eslint-disable-next-line no-return-assign
const isNameUrMom = () => _WasNameYourmom = (() => {
    const username = localStorage
        .getItem('tw:username');
    return username && ((username.toLowerCase() === 'yourmom') || (username.toLowerCase() === 'yourmother') ||
        (username.toLowerCase() === 'urmom') || (username.toLowerCase() === 'urmother'));
})();

const wasNameYourmom = () => {
    const old = _WasNameYourmom;
    _WasNameYourmom = isNameUrMom();
    return old;
};

const isLoaded = () => !!_ScratchBlocks && (isNameUrMom() === wasNameYourmom());

const get = () => {
    if (!isLoaded()) {
        throw new Error('scratch-blocks is not loaded yet');
    }
    return _ScratchBlocks;
};

const load = () => {
    if (_ScratchBlocks && (isNameUrMom() === wasNameYourmom())) {
        return Promise.resolve();
    }
    _ScratchBlocks = null;
    return import(/* webpackChunkName: "sb" */ 'scratch-blocks')
        .then(m => {
            _ScratchBlocks = m.default;
            return _ScratchBlocks;
        });
};

export default {
    get,
    isLoaded,
    isNameUrMom,
    wasNameYourmom,
    load
};
