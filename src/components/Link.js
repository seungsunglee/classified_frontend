import * as React from 'react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'

import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

export const NextLinkComposed = React.forwardRef(function NextLinkComposed(
  props,
  ref
) {
  const {
    to,
    linkAs,
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...other
  } = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  )
})

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don't have roles.
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref} to={href} {...other} />
    )
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
    />
  )
})

export default Link
