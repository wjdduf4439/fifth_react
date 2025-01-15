	// scheduler.js
	//Node.js의 내장 모듈인 fs(파일 시스템)를 불러오는 선언
	const fs = require('fs');
	//Node.js의 내장 모듈인 path(경로)를 불러오는 선언
	const path = require('path');
	//Node.js의 내장 모듈인 schedule(스케줄러)를 불러오는 선언
	const schedule = require('node-schedule');

	// 특정 디렉토리 경로
	const baseDir = 'D:/fifth_storage/template';

	// 스케줄러 설정: 매 시간마다 실행
	/* 
	0 * * * * : 매 시간마다 실행
	* * * * * : 매 분마다 실행
	매일 오전 9시에 실행: '0 9 * * *'
	10초 단위로 실행 : setInterval식으로 변경
	*/
	setInterval(() => {
	//schedule.scheduleJob('0 * * * *', () => {
		console.log('스케줄러 실행 중...');

		// 디렉토리 내의 모든 파일 검사
		fs.readdir(baseDir, (err, directories) => {
		if (err) {
			console.error('디렉토리 읽기 오류:', err);
			return;
		}

		directories.forEach((codehead) => {
			const contentFileDir = path.join(baseDir, codehead, 'contentFile');

			fs.readdir(contentFileDir, (err, files) => {
			if (err) {
				console.error('파일 읽기 오류:', err);
				return;
			}

			files.forEach((file) => {
				const filePath = path.join(contentFileDir, file);

				fs.stat(filePath, (err, stats) => {
					if (err) {
						console.error('파일 상태 읽기 오류:', err);
						return;
					}

					const now = Date.now();
					const fileTime = new Date(stats.mtime).getTime();
					const diff = (now - fileTime) / (1000 * 60 * 60); // 시간 단위로 차이 계산

					if (diff > 1) {
						// 1시간 이상 경과한 파일 삭제
						fs.unlink(filePath, (err) => {
							if (err) {
								console.error('파일 삭제 오류:', err);
							} else {
								console.log(`삭제된 파일: ${filePath}`);
							}
						});
					}
				});
			});
			});
		});
		});
	//});
	}, 10000); // 10초 단위로 실행
