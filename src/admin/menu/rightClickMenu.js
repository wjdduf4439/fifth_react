import React, { memo } from 'react';
import Button from '@mui/material/Button';

import MuiTheme from 'css/MuiTheme';
import AdminMenuTheme from 'css/admin/AdminMenuTheme';

const RightClickMenu = memo(({ xPos, yPos, showMenu, pCode, depth, uid, handleCreate, handleRename }) => {
  if (!showMenu) {
    return null;
  }

  const style = {
    position: 'absolute',
    top: `${yPos}px`,
    left: `${xPos}px`,
  };
/*
console.log("ContextMenu uid: ",uid);
console.log("ContextMenu pCode : ",pCode);
console.log("ContextMenu depth : ",depth);
*/
  return (
    <ul className='dropdownMenu_wrap' style={style}>
	    <li>
			<AdminMenuTheme.RightClickMenuButton onClick={handleCreate}>
				생성
			</AdminMenuTheme.RightClickMenuButton>
		</li>
	      
	    { 
			uid != undefined && uid != 0 && (
	      		<li>
					<AdminMenuTheme.RightClickMenuButton onClick={handleRename}>
						이름변경
					</AdminMenuTheme.RightClickMenuButton>
				</li>
	      	)
	  	}
    </ul>
  );
});

export default RightClickMenu;
