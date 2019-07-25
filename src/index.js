let apply = (action, ...args) => {
    require(`./actions/${action}`)(...args)
}

export default apply
