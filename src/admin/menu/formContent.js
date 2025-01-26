import React, { useState, useEffect, createContext, useCallback  } from 'react';
import { useAxios } from 'provider/AxiosProvider';
import Button from '@mui/material/Button';

import AdminMenuTheme from 'css/admin/AdminMenuTheme';

export const useMenuFormContent = (props) => {

	const {
		reload, setReload,
		menuDataVO, setMenuDataVO,
		getNodeTemplateType, setGetNodeTemplateType,
		dragOverNode, setDragOverNode,
	} = props;

	const [menuDataList, setMenuDataList] = useState([]);
	const [selectMenuRC, setSelectMenuRC] = useState({
		pCode:'',
		depth:0,
	});
	const [targetRename, setTargetRename] = useState(0);
	const ulPaddingLeftMax = 400; // padding-left 값을 변수로 설정
	const menuPaddingLeft = 70; // padding-left 값을 변수로 설정
	
	//선택한 노드 상태
	const [newNodeData, setNewNodeData] = useState({ code: '', title: '새 메뉴', depth: 0 });

	//오른클릭 메뉴 오브젝트 설정 상태
	const [contextMenu, setContextMenu] = useState({
		show: false,
		xPos: 0,
		yPos: 0,
		uid: 0,
		pCode: '',
		depth: 0,
	});
	
	// 노드의 테이블 / 사이트 미구현 여부 상태 설정
    const [isNodeImplement, setIsNodeImplement] = useState(false);
    
    const [collapsedNodes, setCollapsedNodes] = useState(() => {
		const savedState = localStorage.getItem('collapsedNodes');
        return savedState ? JSON.parse(savedState) : false;
	});

	const axiosInstance = useAxios();



	// 노드 접힘 상태 토글 함수, 메뉴 노드의 키를 가져와서 false면 표출, true면 잠금을 한다.
	// collapsedNodes의 초기값이 null이기 때문에 false가 기준
	/*
		prevState는 React의 useState 훅에서 상태 업데이트 함수를 호출할 때 사용할 수 있는 **이전 상태(previous state)**를 나타내는 매개변수입니다.
	 */
	const toggleNodeCollapse = (uid) => {
		setCollapsedNodes(prevState => {
			const newState = {
				...prevState,
				[uid]: !prevState[uid] // 현재 상태의 반대로 설정
			};
			//console.log('collapsedNodes 상태 업데이트:', newState); // 상태 업데이트 후 콘솔에 출력
			return newState;
		});
	};

	const renderTreeSpace = (nodes, type) => {
		return (
			<>
				{/* 드래그된 항목을 위나 아래로 드롭할 수 있도록 이벤트 핸들러 추가 */}
				{	
					(nodes.childNode != null && nodes.childNode.length === 0) ? (
						<span style={{ paddingLeft: 70 + (nodes.depth * menuPaddingLeft) }}></span>
					) : (
						<span style={{ paddingLeft: (nodes.depth * menuPaddingLeft) }}></span>
					)
				}
				{	/* collapsedNodes의 초기값은 null인 상태이기 때문에. + 버튼은 -버튼이 눌리고 난다음 true로 갱신되면 +버튼이 나오게 된다*/
					(type === "tree") ? (
						(nodes.childNode != null && nodes.childNode.length > 0 ) ? (
							(collapsedNodes[nodes.uid]) ? (
								<AdminMenuTheme.NodeOpenButton onClick={() => toggleNodeCollapse(nodes.uid)}>+</AdminMenuTheme.NodeOpenButton>
							) : (
								<AdminMenuTheme.NodeCloseButton onClick={() => toggleNodeCollapse(nodes.uid)}>-</AdminMenuTheme.NodeCloseButton>							)
						) : null
					) : null
				}
			</>
		);
	};

	const renderTree = (nodes) => {
		
		//5픽셀은 왜 필요한거지?
		let aMaxWidthOption = ulPaddingLeftMax - (nodes.depth * menuPaddingLeft) - (nodes.depth * 5);
		
		return(
			<>
				<li key={nodes.uid}>
					{renderTreeSpace(nodes, "tree")}
					<a style={{
							color: (nodes.del_chk === 'Y'? 'red' : 'var(--text-color)'), 
								minWidth: aMaxWidthOption + `px`, 
								borderBottom: dragOverNode === nodes.uid ? '2px solid var(--move-border-color)' : 'none' 
							}}
						href='#none'
						draggable
						onDragStart={(event) => handleDragStart(event, nodes.uid)}
						onDragOver={(event) => handleDragOver(event)}
						onDrop={(event) => handleDrop(event, nodes.uid, 'into')}
						onClick={async () => await getNode(nodes.uid)}
						data-uid={nodes.uid} 
						data-pcode={nodes.pCode}
						data-depth={nodes.depth}
						onContextMenu={handleContextMenu} >
						<span id={'link-' + nodes.uid} style={{ display: targetRename !== nodes.uid ? 'inline' : 'none' }} >
							{nodes.title}
						</span>
						<span id={'rename-' + nodes.uid} style={{ display: targetRename === nodes.uid ? 'inline' : 'none' }} >
							<input 
								placeholder='새 이름' 
								id={'rename-input-' + nodes.uid}
								name='rename-input'
								value={nodes.rename_title}
								onChange={(e) => typeRenameChange(e, nodes.uid)}
								onKeyUp={(e) => typeRenameKeyDown(e, nodes.uid)} 
								//onkeyup, down은 키를 눌러도 키의 값이 input 태그에 반영되지 않는다.
							/>
							<AdminMenuTheme.ListButton1 onClick={() => typeRenameButton(nodes.uid, nodes.rename_title)} >확인</AdminMenuTheme.ListButton1>
						</span>
						
					</a>
					{ 
						nodes.del_chk === 'N' && (
							<AdminMenuTheme.DisableButton onClick={() => deleteNode(nodes.uid)}>
								비활성화
							</AdminMenuTheme.DisableButton>
						)
					}
					{ 
						nodes.del_chk === 'Y' && (
							<span>
								<AdminMenuTheme.DeleteButton onClick={() => deleteNode(nodes.uid)}>삭제</AdminMenuTheme.DeleteButton>
								<AdminMenuTheme.RestoreButton onClick={() => restoreNode(nodes.uid)}>복구</AdminMenuTheme.RestoreButton>
							</span>
						)
					}
					{/* (nodes.uid && nodes.templateType) == false 조건식으로 하지 말것 */}
					{ 
						!(nodes.uid && nodes.templateType)?  (
							<span> ( 미구현 ) </span>	
						) : (<span> </span>)
					}
					{/* 자식 노드 랜더링 */}
					{collapsedNodes[nodes.uid] ? null : (
						nodes.childNode != null && nodes.childNode.length > 0 && (
							<ul className='treeMenu_wrap' data-pcode={nodes.uid}>
								{nodes.childNode.map((node) => renderTree(node))}
							</ul>
						)
					)}
				</li>
				{/* 다음 정렬 기능 이동 공간 */}
				<li style={{ 
							borderBottom: dragOverNode === (nodes.uid + '_next') ? '2px solid var(--move-border-color)' : 'none' ,
							maxHeight : '10px',
							marginLeft :	(nodes.childNode != null && nodes.childNode.length === 0) ? ( 
												70 + (nodes.depth * menuPaddingLeft)
											) : ( 
												70 + (nodes.depth * menuPaddingLeft) 
											),
							backgroundColor: 'var(--move-border-color)'
						}}
					// draggable
					onDragOver={(event) => handleDragOver(event)}
					data-uid={nodes.uid + '_next'} 
					data-pcode={nodes.pCode}
					data-depth={nodes.depth}
					onDrop={(event) => handleDrop(event, nodes.uid, 'next')}
				>
					{renderTreeSpace(nodes, "")}<br/>
				</li>
			</>
		)
	};

	const handleClose = () => {
		setContextMenu({ ...contextMenu, show: false });
	};
	
	const handleCreate = () => {
		addNewNode(selectMenuRC.pCode,selectMenuRC.depth);
		handleClose();
	};
	
	const handleRename = (event) => {
		
	    const uid =  contextMenu.uid;
	    
		console.log("targetRename : ", uid);
		setTargetRename(uid);
		handleClose();
	};
	
	const handleUpdate = () => {
		updateNode(menuDataVO);
		handleClose();
	};
	
	//useCallback 훅을 사용하여 의존성 배열의 값이 변경된 경우, 이벤트를 감지해서 처리한다.
    const handleMenuDataChange = useCallback((event) => {
		
		const { name, type, checked, value } = event.target;
		
		//console.log("handleMenuDataChange uid : " + menuDataVO.uid);
		if(menuDataVO.uid){
			setMenuDataVO((prev) => { 
				let newValue;
				if (type === 'checkbox') {
					// 체크박스의 경우 checked 값에 따라 처리
					//newValue = checked ? value : '';
					/*
					*/
					// 모든 체크된 체크박스의 값을 수집
					if (name === 'fileUploadType') {
						const checkedFileTypes = Array.from(document.querySelectorAll('input[name="fileUploadType"]:checked'))
														.map(input => input.value);
		
						// 새로운 fileUploadType 값을 배열로 설정하고 문자열로 결합하여 새로운 값 설정
						return {
							...prev,
							//targetOption: targetOptionValue,
							fileUploadTypeArr: checkedFileTypes,
							fileUploadType: checkedFileTypes.join(','), // join을 통해 쉼표로 연결된 문자열로 변환
						};
					} else if (name === 'targetOption') {
						
						const targetOptionValue = checked? value : '';
						//console.log("handleMenuDataChange targetOptionValue : " + targetOptionValue);
						return {
							...prev,
							targetOption: targetOptionValue,
						};
					}
					
				} else if (type === 'text') {
					// 텍스트 입력 필드의 경우 value를 그대로 사용
					newValue = value;
				} else {
					// 다른 타입의 입력 필드에 대한 기본 처리
					newValue = value;
				}
				return {
					...prev,
					[name]:  newValue,
				};
			});	
		}
		if(event.target.name === 'templayeType'){
			console.log("handleMenuDataChange templayeType changed! : ");	
		}
		if(event.target.name === 'fileUploadType'){
			console.log("handleMenuDataChange fileUploadType : " + menuDataVO.fileUploadType);	
		}
    }, [menuDataVO]);

	//메뉴 이동 이벤트
	const handleDragStart = useCallback((event, siteCode) => {
		//dataTransfer > 드래그앤 드롭 이벤트 데이터 객체
		event.dataTransfer.setData("text/plain", siteCode);
	}, []);

	const handleDragOver = useCallback((event) => {
		event.preventDefault();

		setDragOverNode(event.currentTarget.dataset.uid);
	}, []);

	const handleDrop = useCallback(async (event, targetUid, position) => {
		event.preventDefault();
		const draggedUid = event.dataTransfer.getData("text/plain");

		//console.log("handleDrop draggedUid : ", draggedUid, " targetUid : ", targetUid, " position : ", position);

		if (draggedUid && draggedUid !== targetUid) {
			await moveNode(draggedUid, targetUid, position);
			setDragOverNode(0);
		}
	}, [setReload]);

	const updateRenameTitleInNode = (node, uid, renameVal) => {
		// 현재 노드의 siteCode가 일치하면 rename_title을 업데이트
			if (node.uid === uid) {
				return {
					...node,
					rename_title: renameVal
				};
			}
		
			// 자식 노드가 있는 경우 재귀적으로 호출하여 업데이트
			if (Array.isArray(node.childNode) && node.childNode.length > 0) {
				return {
					...node,
					childNode: node.childNode.map(child => updateRenameTitleInNode(child, uid, renameVal))
				};
			}
		
			return node;
		};

	const typeRenameChange = (event, uid) => {
		
		//const renameVal = event.currentTarget.value; < 현재 선택할 때의 요소, 내가 키보드를 입력하지 않았을때의 값이 그대로 나온다
		console.log("typeRenameChange : ", event.target.value);
		//console.log("typeRenameChange : ", event.target.id);
	    const renameVal = event.target.value;
	    
		setMenuDataList(menuData =>
            menuData.map(item => updateRenameTitleInNode(item, uid, renameVal))
        );
	};

	const typeRenameKeyDown = (event, siteCode) => {
	    if (event.key === 'Enter') {
	        event.preventDefault();
	        //console.log("typeRenameKeyDown : ", event.target.value);
	        renameNode(siteCode, event.target.value); // 엔터 키가 눌렸을 때 renameNode 함수 호출
	    }
	};

	const typeRenameButton = (siteCode, title) => {
		renameNode(siteCode, title); // 엔터 키가 눌렸을 때 renameNode 함수 호출
	};
	
	const handleContextMenu = (event) => {
		event.preventDefault();
		// 클릭된 li 요소의 data 속성 값 가져오기
	    let targetA = event.currentTarget;
	    let uid = targetA.getAttribute('data-uid');	
	    let pCode = targetA.getAttribute('data-pcode') !== null? targetA.getAttribute('data-pcode') : '';
	    let depth = targetA.getAttribute('data-depth') !== null? parseInt(targetA.getAttribute('data-depth')) : 0;
		
		console.log("handleContextMenu eventpos : ",event.pageX, " : ", event.pageY);
		
		setContextMenu({
			show: true,
			xPos: event.pageX - 100,
			yPos: event.pageY - 230,
			uid: uid,
			pCode: pCode,
			depth: depth,
		});
		
	    
	    if(uid == null)	depth = 0;
	    else					depth = depth + 1;
	    
	    //console.log("handleContextMenu uid : ",uid, " depth : ", depth, " pCode : ", pCode);
	    
		setSelectMenuRC({
	        pCode: uid, //생성되기 위한 자료형이기 때문에, 곧 생성될 노드의 해당 pCode는 현재 오른클릭한 노드의 siteCode로 정한다. 
	        depth: depth,
	    });
		
		//상위요소 이벤트 방지
		event.stopPropagation();
	};

	const updateUidString = (resultList) => {
		
			const newItem = {
				...resultList,
				uid: resultList.uid.toString(), // uid 키 추가
			};
				
			if (Array.isArray(newItem.childNode) && newItem.childNode.length > 0) {
				newItem.childNode = newItem.childNode.map(child => updateUidString(child));
			}
			
		return newItem; // 변환된 newItem 반환
	}
	
	const appendRenameTitleKey = (resultList) => {
		
			const newItem = {
	            ...resultList,
	            rename_title: resultList.title, // rename_title 키 추가
			};
				
			if (Array.isArray(newItem.childNode) && newItem.childNode.length > 0) {
				newItem.childNode = newItem.childNode.map(child => appendRenameTitleKey(child));
	        }
	        
		return newItem; // 변환된 newItem 반환
	}

	const getMenuList = async () => {
        const formData = { index: 0, string_index : '<script>alert(\'hello!\');</script>', menulist_index : 0, boolean_test : true, json_test : { param1 : 'this is param1 alert', param2 : 'console.log(\'this is param2 eval\')' },  };
        try {
            await axiosInstance.post('/api/admin/menu/list', formData)
			.then(response => {
				const data = response.data;
				if (data.result) {
            		//const transformedData = transformMenuData(data.resultList);
					if(data.resultList !== undefined ){
						const transformedData = data.resultList.map(item => {
							//console.log(item);
							const processedItem = updateUidString(item);
							const processedItem2 = appendRenameTitleKey(processedItem);
							return processedItem2;
						});
            			console.log(transformedData);
						setMenuDataList(transformedData);
					}
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const getNode = async (uid) => {		
			
			//console.log("addNewNode Parent node siteCode: ", siteCode);
			
			let requestNodeData = { uid: uid };
        
            await axiosInstance.post("/api/admin/menu/write", requestNodeData)
			.then(response => {
				const data = response.data;
				if (data.result) {
					//alert(data.message);
					
					const resultList = data.resultList;
					
		            Object.keys(resultList).forEach(key => {
						//console.log('처리 key : ' + key);
		                if (resultList[key] === null) {
		                    resultList[key] = '';
		                }
		                //fileUploadTypeArr 키는 아무 쓸모 없지만, 그냥 문자열과 문자열 배열의 연계를 하고 싶었다
		                if (key === 'fileUploadType') {
							resultList['fileUploadTypeArr'] = resultList['fileUploadType'].split(',');
		                }
		            });
					
					
					//수정한 적이 없고, templateType 값이 없으면 템플릿타입의 selectbox를 활성화한다.
					setGetNodeTemplateType((resultList.templateType && resultList.lastUpdtPnttm)? true : false);
					setMenuDataVO(resultList);
	                //setReload(true);
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});
    };

    const addNewNode = async (pCode, depth) => {		
			/*
			console.log("addNewNode Parent node pcode: ", pCode);
			console.log("addNewNode Parent node depth: ", depth, " > ", (depth+1));
			*/
			let requestNodeData = { ...newNodeData, pCode: pCode, depth: depth };
        
            await axiosInstance.post("/api/admin/menu/insert", requestNodeData)
			.then(response => {
				const data = response.data;
				if (data.result) {
	                setReload(true);
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});
    };
    
    const renameNode = async (uid, title) => {		
			
			let requestNodeData = { uid: uid, title: title};
        
            await axiosInstance.post("/api/admin/menu/rename", requestNodeData)
			.then(response => {
				const data = response.data;
				if (data.result) {
					alert(data.message);
					setReload(true);
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});
    };
    
    const updateNode = async (menuDataVO) => {		
		
			//react 나머지 연산자 활용, childNode를 제외한 모든 다른 속성들을 requestNodeData라는 객체로 저장
			if(menuDataVO.maxFileUploadNumber === '' ) menuDataVO.maxFileUploadNumber = '0';
			const { childNode, ...requestNodeData } = menuDataVO;
        
            await axiosInstance.post("/api/admin/menu/update", requestNodeData)
			.then(response => {
				const data = response.data;
				if (data.result) {
					alert(data.message);
					setIsNodeImplement(menuDataVO.siteCode && menuDataVO.templateType);
					setReload(true);
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});
    };
    
    const deleteNode = async (uid) => {		
			
			let requestNodeData = { uid: uid };
        
            await axiosInstance.post("/api/admin/menu/delete", requestNodeData)
			.then(response => {
				const data = response.data;
				if (data.result) {
					alert(data.message);
		            setReload(true);
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});
    };
    
    const restoreNode = async (uid) => {		
		
			//console.log( "restoreNode : " + $tree.jstree(true).get_node(siteCode) );
			
			let requestNodeData = { uid: uid };
        
            await axiosInstance.post("/api/admin/menu/restore", requestNodeData)
			.then(response => {
				const data = response.data;
				if (data.result) {
					alert(data.message);
		            setReload(true);
				} else {
					alert("문제가 발생했습니다 : " + data.message);
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});
    };
	
	const moveNode = async (draggedUid, targetUid, position) => {
		//console.log('메뉴 이동 이벤트 결과:', draggedUid, " : ", targetUid, " : ", position);
		
		let requestNodeData = { draggedUid: draggedUid, targetUid: targetUid, position: position };
		
		await axiosInstance.post("/api/admin/menu/move", requestNodeData)
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
	            setReload(true);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	};
    
    const updateContext = (newMenuDataVO) => {
        setMenuDataVO(newMenuDataVO);
    };
	
    useEffect(() => {
		
		if(reload){
			getMenuList();
			setTargetRename('');
			setReload(false);
		}
	}, [reload]);
	
	// 상태 업데이트 로직 추가
    useEffect(() => {
        setIsNodeImplement(menuDataVO.siteCode && getNodeTemplateType);
    }, [menuDataVO.siteCode, getNodeTemplateType]);
    
    // menuOpen 상태가 변경될 때마다 브라우저 캐시에 저장
    useEffect(() => {
        localStorage.setItem('collapsedNodes', JSON.stringify(collapsedNodes));
    }, [collapsedNodes]);

	return {
        menuDataList,
        menuPaddingLeft,
        contextMenu, setContextMenu,
        isNodeImplement,
        renderTree,
        handleClose,
        handleCreate,
        handleRename,
        handleUpdate,
        handleMenuDataChange,
        handleContextMenu,
        updateContext,
	}
}	