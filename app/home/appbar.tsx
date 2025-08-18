'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

const Appbar = () => {
  return (
    <NavigationMenu style={{ width: '100%', maxWidth: 'none', justifyContent: 'flex-start' }}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink style={{ textAlign: 'left'}}>Task Master</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Appbar