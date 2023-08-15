import React from 'react';
import { TopBar } from "@shopify/polaris";

const TopBarMarkup = () => {
    const userMenuMarkup  = (
        <TopBar.UserMenu name="Dang" detail="Minh Dang" initials="D" />
    );
    
    return <TopBar userMenu={userMenuMarkup}/>;
}

export default TopBarMarkup;