---
title: "노트북에 우분투 설치하기"
subtitle: "다시는 LG 노트북을 사지 않겠다..."
date: 2021-11-12
tags: ['ubuntu', 'tech']
published: true
---

전역하고 그동안 모아뒀던 돈으로 데스크탑 PC를 장만했다. 그동안 쓰던 노트북은 어짜피 이제 게임을 하지는 않을테니 우분투나 한번 깔아서 써볼까? 하고 우분투를 설치하기로 했다. 검색해서 보통 나오는 내용으로 rufus로 우분투 .iso 파일을 USB에 구워서 노트북에 꽂고 bios 에서 부팅 순서를 변경하고 부팅했더니 USB를 인식하지 못한다. 구글링을 좀 한 결과, LG 노트북에서 나와같은 증상을 겪는 사람이 은근히 있었다.



- [클리앙 - LG 노트북이 리눅스 USB를 인식못하네요...](https://www.clien.net/service/board/cm_linux/12324583)
- [윈도우가 이미 깔려 있는 LG 그램 17인치(15Z990-VA5WK)에 리눅스 민트 시나몬(19.3)를 설치하면서 겪은 일](https://luxurycoop.tistory.com/41)
- [LG 노트북에 우분투 깔기 실패담](https://www.ds2wgv.info/1661)
- [navisphere.net - LG 랩탑 13U580-GR30 우분투 설치](http://www.navisphere.net/6126/lg-%eb%9e%a9%ed%83%91-13u580-gr30-%ec%9a%b0%eb%b6%84%ed%88%ac-%ec%84%a4%ec%b9%98/)



# 원인

하... 하드웨어 쪽은 잘 모르는데... 일단 잘은 모르겠지만 설치를 성공하고 나서 증상을 뇌피셜로 정리하면 다음과 같다.



1. 이 노트북의 bios는 NTFS 파티션이 있는 장치만을 부팅 가능한 디스크로 인식한다.
2. 그러나 NTFS로 부팅을 하지는 않고 FAT32 파티션을 찾아서 그 파티션으로 부팅을 시작한다.



# 해결 방법

## 부팅 가능한 USB 만들기

따라서 부팅 가능한 USB를 만들기 위해서는 rufus의 UEFI:NTFS로 포맷을 한다. 이 USB를 그대로 노트북에 꽂아서 부팅하면 화면에 UEFI-NTFS 부트로더가 작동하는 것을 볼 수 있다. [공식 홈페이지](https://github.com/pbatard/uefi-ntfs)의 Overview를 참조해보자.



> * Rufus creates 2 partitions on the target USB disk (these can be MBR or GPT partitions). The first one is an NTFS partition occupying almost all the drive, that contains the Windows files (for Windows To Go, or for regular installation), and the second is a very small FAT partition, located at the very end, that contains an NTFS UEFI driver (see [https://efi.akeo.ie](https://efi.akeo.ie/)) as well as the UEFI:NTFS bootloader.
> * When the USB drive boots in UEFI mode, the first NTFS partition gets ignored by the UEFI firmware (unless that firmware already includes an NTFS driver, in which case 2 boot options will be available, that perform the same thing) and the UEFI:NTFS bootloader from the bootable FAT partition is executed.
> * UEFI:NTFS then loads the relevant NTFS UEFI driver, locates the existing NTFS partition on the same media, and executes the `/efi/boot/bootia32.efi`, `/efi/boot/bootx64.efi`, `/efi/boot/bootarm.efi` or `/efi/boot/bootaa64.efi` that resides there. This achieves the exact same outcome as if the UEFI firmware had native support for NTFS and could boot straight from it.



첫 번째 항목에 따라 USB에는 다음과 같은 파티션이 생긴다.

| NTFS 파티션 | FAT32 파티션                                |
| ----------- | ------------------------------------------- |
| 빈 공간     | UEFI-NTFS 부트로더 (약 100MB 쯤 되던가...?) |

두 번째 항목에 따르면 이 USB를 노트북에 꽂아서 부팅하면 UEFI 펌웨어가 첫 번째 NTFS 파티션을 무시하고 실행 가능한 FAT32 파티션에 있는 UEFI:NTFS 부트로더가 실행된다.

세 번째 항목에 따르면 UEFI:NTFS 부트로더는 그 다음에 자신의 앞에 있는 NTFS 파티션에 있는 `/efi/boot/bootxxxx.efi` 를 찾아 CPU의 아키텍쳐에 따라 맞는 파일을 알아서 실행한다.

결과적으로는 NTFS 파티션을 직접적으로 부팅하는 것 처럼 보인다.



따라서 다시 USB를 PC에 꽂아서 비어있는 NTFS 파티션 안에 우분투 .iso 내용을 그대로 복사 붙여넣기 한 다음 노트북에 다시 꽂으면 우분투 설치가 가능하다.



## 우분투 설치하기

그러나, 일반적인 방법으로 설치하면 설치 후 부팅이 되지 않는다. UEFI 방식으로 우분투를 설치하되, 맨 앞에 NTFS 파티션을 하나 또 만들어 줘야한다.



| NTFS 파티션 | FAT32 파티션                | 일반 리눅스 파티션 |
| ----------- | --------------------------- | ------------------ |
| 200 MB 정도 | EFI System Partition 200 MB |                    |



그리고 FAT32 파티션에 부트로더를 설치하도록 지정한 후 설치를 계속한다. 설치가 끝난 후 USB 제거 후 노트북을 켜면 역시나 부팅이 되지 않는다. 생각대로라면 NTFS 파티션도 있고 FAT32에 부트로더를 설치하도록 해 두었으니 공식 문서 설명에 따라 실행이 되어야 할 것 같은데 말이다. 일단 왜 그런지는 모르겠고 USB가 부팅이 되니 똑같이 만들어 주기로 했다.



## USB랑 똑같이 만들어 주기

다시 USB로 부팅하여 우분투 체험하기를 이용하여 작업을 진행한다. FAT32 파티션 안에 있는 내용을 NTFS 파티션으로 옮기고 FAT32 파티션에는 USB에 있는 FAT32파티션 내용을 그대로 복사한다. 이렇게 하면 일단 USB 처럼 FAT32에 있는 UEFI:NTFS 부트로더가 정상적으로 실행이 된다.



그리고 NTFS 파티션에는 추가로 일반 리눅스 파티션의 grub 설정 파일, USB의 NTFS 파티션에 있는 `boot/grub`, `efi/boot/grubx64.efi` 를 넣어주었다.



이렇게 하니까 부팅이 되었다. 제대로 한 건지도 모르겠다. 일단 부팅이 되었으니 나의 똥꼬쑈는 끝이 났다. (거지같은 LG...)

