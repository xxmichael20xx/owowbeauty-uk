(function () {
    const expandableContentConfig = {
        init: function () {
            console.log('Expandable content config initialized')

            document.addEventListener('click', e => {
                const btn = e.target.closest('.expandable-content__blocks .accordion__label')
                if (! btn) return

                const wrapper = btn.closest('.accordion__inner')
                const content = wrapper.querySelector('.accordion__content')
                const isOpen = wrapper.getAttribute('data-open') === 'true'

                wrapper.setAttribute('data-open', String(! isOpen))
                btn.setAttribute('aria-expanded', String(! isOpen))
                content.setAttribute('aria-hidden', String(isOpen))

                if (! isOpen) {
                    content.style.display = 'block'
                    content.style.maxHeight = content.scrollHeight + 'px'
                    content.style.opacity = '1'
                    content.style.paddingTop = ''
                    content.style.paddingBottom = ''
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px'
                    requestAnimationFrame(() => {
                        content.style.maxHeight = '0px'
                        content.style.opacity = '0'
                        content.style.paddingTop = '0'
                        content.style.paddingBottom = '0'
                    })

                    const handleTransitionEnd = function (e) {
                        if (e.propertyName === 'max-height') {
                            content.style.display = 'none'
                            content.removeEventListener('transitionend', handleTransitionEnd)
                        }
                    }

                    content.addEventListener('transitionend', handleTransitionEnd)
                }
            })
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        expandableContentConfig.init()
    })
})()
