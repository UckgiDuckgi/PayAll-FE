'use client';

type OrderInfo = {
  orderDate: string;
  productInfo: string;
  productAmount: string;
  shippingFee: string;
};

function parseOrderTable(html: string): OrderInfo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const rows = doc.querySelectorAll('tbody tr');
  const orders: OrderInfo[] = [];

  rows.forEach((row) => {
    const orderDateElement = row.querySelector('td:first-child .odr_date');
    const productInfoElement = row.querySelector(
      'td:nth-child(2) .cont p:nth-of-type(2) a'
    );
    const productAmountElement = row.querySelector('td:nth-child(3) strong');
    const shippingFeeElement = row.querySelector('td:nth-child(4) .fnt_2');

    if (
      orderDateElement &&
      productInfoElement &&
      productAmountElement &&
      shippingFeeElement
    ) {
      const cleanText = (text: string): string =>
        text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();

      const cleanProductInfo = (info: string): string =>
        cleanText(info)
          .replace(/우주패스/g, '')
          .trim();

      orders.push({
        orderDate: cleanText(orderDateElement.textContent || ''),
        productInfo: cleanProductInfo(productInfoElement.textContent || ''),
        productAmount: cleanText(productAmountElement.textContent || ''),
        shippingFee: cleanText(shippingFeeElement.textContent || ''),
      });
    }
  });

  return orders;
}

export default function ElevenStreetTest() {
  const html = `<div id="listLoop">
<form name="forPageFrm" method="get">
    <input type="hidden" name="currpageNo">
    <input type="hidden" name="pageNumber">
    <input type="hidden" name="pageNumberPendingDone" value="1">
    <input type="hidden" name="pageNumberPendingFail" value="1">
    <input type="hidden" name="shDateFrom">
    <input type="hidden" name="shDateTo">
    <input type="hidden" name="shPrdNm">
    <input type="hidden" name="shOrdprdStat">
    <input type="hidden" name="type" value="orderList2nd">
    <input type="hidden" name="ver" value="02">
    <input type="hidden" name="nDate" value="">
</form>

<form name="forResendFrm" method="post">
    <input type="hidden" name="ordNo" value="">
    <input type="hidden" name="ordPrdSeq" value="">
    <input type="hidden" name="searchType" value="">
    <input type="hidden" name="certNo" value="">
    <input type="hidden" name="prdNo" value="">
</form>

<form name="forQnaFrm" method="post">
    <input type="hidden" name="orderNo" value="">
    <input type="hidden" name="prdNo" value="">
    <input type="hidden" name="prdNm" value="">
</form>

<div class="mytmall_tbl1" id="mytmall_tbl1_area" role="tabpanel" aria-label="리스트보기">
    <form name="orderList" method="post">
        <input type="hidden" name="CHOICEMENU" value="A02">
        <input type="hidden" name="ordNo">
        <input type="hidden" name="ordPrdSeq">
        <input type="hidden" name="prdNo">
        <input type="hidden" name="prdTypCd">
        <input type="hidden" name="ordQtySum">
        <input type="hidden" name="prdNm">
        <input type="hidden" name="dispOptNm">
        <input type="hidden" name="addPrdYn">
        <input type="hidden" name="allYn">
        <input type="hidden" name="shProductStat">
        <input type="hidden" name="gubun">
        <input type="hidden" name="ver" value="02">        <!-- 신규페이지용 코드 -->
        <input type="hidden" name="callbackHost" value="https://buy.11st.co.kr"><!-- 상품리뷰 작성후 콜백 페이지 -->
        <input type="hidden" name="certNo">
        <input type="hidden" name="isSSL" value="">
        <input type="hidden" name="sellerMemNo">

        <input type="hidden" name="isAcmeRtdSwitchOpen" value="false">
        <input type="hidden" name="isFamilyPayment">



        <!-- //주문상품상세보기 레이어 --> <!--이 주석이 있을시 ie6에서 테이블위bg가 안나옵니다.개발시 빼주셔요 -->
        <table width="100%">
            <caption>주문내역</caption>
            <colgroup>
                <col width="112px">
                <col width="">
                <col width="95px">
                <col width="110px">
                <col width="110px">
                <col width="95px">
            </colgroup>
            <thead>
            <tr>
                <th class="first" scope="col">주문일자</th>
                <th scope="col">주문 상품 정보</th>
                <th scope="col">상품금액(수량)</th>
                <th scope="col">배송비(판매자)</th>
                <th scope="col">주문상태
                    
                    <button type="button" class="bt_select_order_stat" onclick="document.getElementById('lay_orderchk').style.display='block';return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="delivery_status" data-log-body="{}"><span class="bt_moreView"><em>주문상태 선택 열기</em></span></button>
                    <!-- 레이어 - 주문상태 선택 -->
                    <div id="lay_orderchk" class="layer_addTxt w156" style="display:none;">
                        <h3 class="type2" id="ar-order_check">주문상태 선택</h3>
                        <ul class="chk_list">
                            <li><label for="shOrdprdStat1"><input type="checkbox" name="shOrdprdStat" id="shOrdprdStat1" value="102">입금대기중</label></li>
                            <li class="right"><label for="shOrdprdStat2"><input type="checkbox" name="shOrdprdStat" id="shOrdprdStat2" value="501">배송완료</label></li>
                            <li><label for="shOrdprdStat3"><input type="checkbox" name="shOrdprdStat" id="shOrdprdStat3" value="202">결제완료</label></li>
                            <li class="right"><label for="shOrdprdStat4"><input type="checkbox" name="shOrdprdStat" id="shOrdprdStat4" value="901">구매확정</label></li>
                            <li><label for="shOrdprdStat5"><input type="checkbox" name="shOrdprdStat" id="shOrdprdStat5" value="301">배송준비중</label></li>
                        </ul>
                        <div class="allchk order_stat_filter_btn_group" data-log-actionid-area="delivery_status" data-log-actionid-label="undefined" data-log-body="{}"><button type="button" onclick="allOrdPrdStatChg(true);" data-log-actionid-label="sellection_all">전체선택</button> | <button type="button" onclick="allOrdPrdStatChg(false);" data-log-actionid-label="sellection_off">선택해제</button>
                            <a href="javascript:setReadList(1, 'orderList2nd');" class="bt_find" data-log-actionid-label="search"><span>찾기</span></a></div>
                        <div class="close"><a href="javascript:void(0);" class="bt_close order_stat_filter_btn_group" aria-describedby="ar-order_check" data-log-actionid-label="close" onclick="document.getElementById('lay_orderchk').style.display='none';return false;" data-log-actionid-area="delivery_status" data-log-body="{}">주문상태 선택 닫기</a>
                        </div>
                    </div>
                    <!-- //레이어 - 주문상태 선택 -->
                    
                </th>
                <th scope="col">확인/취소/리뷰</th>
            </tr>
            </thead>
            <tbody>


                
            <input type="hidden" name="addPrdYn202411248980887481" value="N">
                
            <input type="hidden" name="isMainPrd202411248980887481" value="N">
            <input type="hidden" name="ingCancelAddPrds202411248980887481" value="N">
            <input type="hidden" name="ingReturnAddPrds202411248980887481" value="N">
            <input type="hidden" name="ingChangeAddPrds202411248980887481" value="N">
            <input type="hidden" name="ordQtySum202411248980887481" value="1">
            <input type="hidden" name="ordQtySum20241124898088748" value="1">
            <input type="hidden" name="isAppleCareProducts202411248980887481" value="false">
            <input type="hidden" name="ordPrdSeq20241124898088748">
            <input type="hidden" name="prdNm20241124898088748" value="필립스 노렐코 노즈 트리머 5000 (NT5600/62)">
            <input type="hidden" name="dispOptNm20241124898088748" value="선택옵션:Nose Trimmer 5000, 최신 버전">
            <input type="hidden" name="addPrdYn20241124898088748" value="N">
            <input type="hidden" name="prdNo20241124898088748" value="6652982617">
            <input type="hidden" name="rejectReturnYn_202411248980887481" value="N">
            <input type="hidden" name="rejectExchangeYn_202411248980887481" value="N">
            <input type="hidden" name="freeReturnYn_202411248980887481" value="N">
            <input type="hidden" name="dlvClf_202411248980887481" value="02">
            <input type="hidden" name="ordCnStepCd_202411248980887481" value="12">
            <input type="hidden" name="pyinMonQty_202411248980887481" value="">
            <input type="hidden" name="sellerNo_202411248980887481" value="N">
            <input type="hidden" name="sellerMemNo_20241124898088748" value="66852156">
            <input type="hidden" name="isYes24_202411248980887481" value="false">
            <input type="hidden" name="isNotExchangeYn_202411248980887481" value="N">
            <input type="hidden" name="isBtnClaimYn_20241124898088748" value="N">
            <input type="hidden" name="isHomePlus_202411248980887481" value="N">
            <input type="hidden" name="isEmart_202411248980887481" value="N">
            <input type="hidden" name="isLottemart_202411248980887481" value="N">
            <input type="hidden" name="isLottemartOM_202411248980887481" value="N">
            <input type="hidden" name="isSsg_202411248980887481" value="N">
            <input type="hidden" name="isDutyFreeSeller_202411248980887481" value="N">
            <input type="hidden" name="isAcmeOrderYn_202411248980887481" value="Y">
            <input type="hidden" name="isShootingWater_202411248980887481" value="false">

            <input type="hidden" name="vcenterClmCnt_202411248980887481" value="0">

                

            <input type="hidden" name="prd20241124898088748" value="6652982617">
            <input type="hidden" name="addprd20241124898088748" value="0">
            <input type="hidden" name="tmpck20241124898088748" value="2472895014">
            <input type="hidden" name="stat20241124898088748" value="901">
            <input type="hidden" name="stat202411248980887481" value="901">
            <input type="hidden" name="hordprdseq20241124898088748" value="">

                
            <input type="hidden" name="guaranteeYN20241124898088748" value="N"> <!-- 안심보장서비스여부-->

            <input type="hidden" name="ordPrdSubStatCd_202411248980887481" value="">
            <input type="hidden" name="slctDlvClfCd_202411248980887481" value="">
            <input type="hidden" name="isPartRefundUnavailable_202411248980887481" value="false">
            <input type="hidden" name="reqReturnAlertMessage_202411248980887481" value="null">
            <input type="hidden" name="reqOrderDecisionAlertMessage_202411248980887481" value="null">


            <!--  주문번호의 첫줄일때만 class=first 사용한다. -->
            <!-- 첫줄은 top라인이 나오지 않게하기위해 first클래스 -->
                
            <tr class="first"> 

                <!-- 주문일자 시작 -->
                    
                <td class="first" rowspan="1"><!-- 각줄의 첫번째칸 왼쪽라인은 안나오게 하기위해서 first 클래스 삽입 -->
                    <input type="hidden" id="prdTypCd20241124898088748" value="01">
                    <!-- [PROJ-101] 아파트 관리비 서비스를 식별하기 위함(ord_path_clf : 96) -->
                    <input type="hidden" id="ordPathClf20241124898088748" value="02">
                    
                    <p class="odr_date"><a href="javascript:goOrderDetail('20241124898088748');" class="bt_detailview" row-num="0" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:1}" data-is-ab-send="1">2024-11-24
                        <br>(20241124898088748)</a></p>

                    <p><a href="javascript:goOrderDetail('20241124898088748');" class="bt_detailview" row-num="0" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:1}"><span>상세보기</span></a></p>
                    
                    <!-- 전세계 배송 추가금 결제 -->
                    

                    

                    

                </td>
                    

                <!-- 주문일자 끝 -->
                <!-- 주문상품정보 시작 -->
                <!--  같은주문번호에서 셀병합이 되지 않는 TD의 경우   같은주문번호의 마지막 TD는 class를 제거한다(굵은라인)-->
                <!-- 속해있는 내용들의 bottom라인은 좀더 옅은 회색이 되야해서 line0클래스 삽입 -->
                    
                <td>
                    <!-- 주문시 상품정보 표시할 레이어 -->
                    <div class="orderProdInfo_v2">
                        <label for="ck20241124898088748_1" class="chk"><input type="hidden" disabled="" name="ck20241124898088748" id="ck20241124898088748_1" value="1"></label>
                        <span class="img">
									
										<img src="https://cdn.011st.com/11dims/resize/80/11src/asin/B0CLWL76HK/B.jpg?1737080211669" alt="" onerror="javascript:this.src='//s.011st.com/img/product/no_image_80.gif';">
									
								</span>

                        <div class="cont  ">
                            <p>
                                
                                
                                
                                
                                
                            </p>
                            <p>
                                
                                
                                
                                
                                        
                                            <a href="#" id="a_layer_orderDetail_20241124898088748_0" ord-no="20241124898088748" row-num="0" role="button" aria-expanded="false" onclick="goProductDetailLayer('//buy.11st.co.kr','20241124898088748', '1', '6652982617', 'layer_orderDetail_20241124898088748_0');this.setAttribute('aria-expanded','true');return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="order_list" data-log-body="{&quot;position_l2&quot;:1,&quot;order_no&quot;:&quot;20241124898088748&quot;}">
                                        

                                            
                                            
                                            
                                                <span class="c_icon_sktpass">우주패스</span>
                                            
                                            
                                            
                                            
                                            
                                                필립스 노렐코 노즈 트리머 5000 (NT5600/62)
                                        
                                            </a>
                                        
                                
                                
                                
                            </p>
                            
                            
                            <p class="op">
                                선택옵션:Nose Trimmer 5000<br> 최신 버전
                            </p>
                            
                            

                            

                            

                            

                            

                            <div class="multiple_btn_box">
                                
                                
                            </div>
                        </div>
                        <div id="layer_orderDetail_20241124898088748_0" class="layer_relative"></div>
                        
                    </div>
                </td>
                <!-- 주문상품정보 끝-->
                <!-- 주문금액 시작 -->
                    
                <td>
                    <p class="fnt_1">
                        
                        
                        <strong>21,250원</strong>
                        
                        
                        
                        <br>(1개)
                        

                        <!--2009-10-09 정보입력버튼 추가-->
                        
                    </p>
                </td>
                <!-- 주문금액 종료-->
                <!-- 배송비 시작-->
                    
                    
                <td rowspan="1">
                    

                    
                    <p class="fnt_2">무료
                        
                    </p>
                    <!-- 2011-05-02 추가 -->
                    
                    <!-- //레이어 -->
                    <!-- //2011-05-02 추가 -->


                    
                    
                    <!--  하나의 묶음번호에 판매자가 1명일때 -->
                    
                    <div class="shopinfo_wrap">
                        
                        <p><a href="https://www.11st.co.kr/display-view/acme/main"><span class="c_bi_amazon">Amazon</span></a></p>
                        <p class="fnt_1">미국</p>
                        
                            
                            
                        <div class="shop_box" id="shopBox_0">
                            <ul>
                                
                                
                                <li>
                                    <a class="shop_box_btn" href="javascript:insertFavorShopPopup('F+5vPVll9K7RHU5jDn1Mqg==' ,'1397056', '20241124898088748');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어찜&quot;}">스토어찜</a>
                                </li>
                                
                                <li><a class="shop_box_btn" href="javascript:goStore('6652982617', '20241124898088748', '66852156','N','0', 'false', '');" onmouseout="layerHidden('shopBox_0');$('#a_shopBox_0').attr('aria-expanded', 'false');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어 방문&quot;}">스토어 방문</a></li>
                            </ul>
                        </div>
                            

                        </div>

                        
                        <!--  하나의 묶음번호에 판매자가 여러명일때 -->
                            
                            
                    
                </td>
                    
                <!-- 배송비 종료-->
                <!-- 주문상태 시작-->
                    
                <td class="td-center">
                    <div class="my-list-sell">
                        
                    <span class="fc_blue">구매확정</span>
                    	
                        
                            
                        <div class="lay_globalwrap">
                            <div id="arrivalScheDlvDtLayer_0" class="lay_ty" style="display:none;">
                                <h3>배송안내</h3>
                                
                                    <div class="list_pr em">판매자, 택배사 사정으로 예측치와 다를 수 있습니다.</div>
                                
                            </div>
                        </div>
                        
                        

                        
			            
			            




<p class="my-list-sell__row">
    <a href="javascript:goDeliveryTracking('2472895014', '00044');" onclick="rakeLog.sendRakeLog(this);" class="mytmall_bt01 c-button-my c-button-my--normal" ord-no="20241124898088748" row-num="0" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;배송조회&quot;,&quot;position_l2&quot;:1,&quot;order_no&quot;:&quot;20241124898088748&quot;}">배송조회</a></p>

<p class="my-list-sell__row"><a href="#" class="mytmall_bt01 c-button-my c-button-my--normal" ord-no="20241124898088748" row-num="0" onclick="launchReviewModify('20241124898088748','6652982617','1');return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;리뷰작성&quot;,&quot;position_l2&quot;:1,&quot;order_no&quot;:&quot;20241124898088748&quot;}">리뷰작성</a></p>

<!-- 발송지연 안내문구 추가 :S -->

<!-- //배송지연공지 안내 팝업 -->
<!-- 발송지연 안내문구 추가 :E-->

<p class="my-list-sell__row">
    <a href="javascript:sellerQnaWrite('20241124898088748', '1', '6652982617');" class="mytmall_bt01 c-button-my c-button-my--normal" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;판매자문의&quot;}">판매자문의</a>
</p>

</div>
</td>
<!-- 주문상태 종료-->
<!-- 처리버튼시작-->

<td class="gray">

<div class="my-list-sell">

</div>
</td>

            <input type="hidden" name="addPrdYn202401217812336051" value="N">
                
            <input type="hidden" name="isMainPrd202401217812336051" value="N">
            <input type="hidden" name="ingCancelAddPrds202401217812336051" value="N">
            <input type="hidden" name="ingReturnAddPrds202401217812336051" value="N">
            <input type="hidden" name="ingChangeAddPrds202401217812336051" value="N">
            <input type="hidden" name="ordQtySum202401217812336051" value="1">
            <input type="hidden" name="ordQtySum20240121781233605" value="1">
            <input type="hidden" name="isAppleCareProducts202401217812336051" value="false">
            <input type="hidden" name="ordPrdSeq20240121781233605">
            <input type="hidden" name="prdNm20240121781233605" value="SK매직 방수비데 BID-E16D  IPX6등급 무필터 자가설치">
            <input type="hidden" name="dispOptNm20240121781233605" value="설치방법:자가설치(택배발송)">
            <input type="hidden" name="addPrdYn20240121781233605" value="N">
            <input type="hidden" name="prdNo20240121781233605" value="6615368661">
            <input type="hidden" name="rejectReturnYn_202401217812336051" value="N">
            <input type="hidden" name="rejectExchangeYn_202401217812336051" value="N">
            <input type="hidden" name="freeReturnYn_202401217812336051" value="N">
            <input type="hidden" name="dlvClf_202401217812336051" value="02">
            <input type="hidden" name="ordCnStepCd_202401217812336051" value="">
            <input type="hidden" name="pyinMonQty_202401217812336051" value="0">
            <input type="hidden" name="sellerNo_202401217812336051" value="N">
            <input type="hidden" name="sellerMemNo_20240121781233605" value="45298971">
            <input type="hidden" name="isYes24_202401217812336051" value="false">
            <input type="hidden" name="isNotExchangeYn_202401217812336051" value="N">
            <input type="hidden" name="isBtnClaimYn_20240121781233605" value="N">
            <input type="hidden" name="isHomePlus_202401217812336051" value="N">
            <input type="hidden" name="isEmart_202401217812336051" value="N">
            <input type="hidden" name="isLottemart_202401217812336051" value="N">
            <input type="hidden" name="isLottemartOM_202401217812336051" value="N">
            <input type="hidden" name="isSsg_202401217812336051" value="N">
            <input type="hidden" name="isDutyFreeSeller_202401217812336051" value="N">
            <input type="hidden" name="isAcmeOrderYn_202401217812336051" value="N">
            <input type="hidden" name="isShootingWater_202401217812336051" value="false">

            <input type="hidden" name="vcenterClmCnt_202401217812336051" value="0">

                

            <input type="hidden" name="prd20240121781233605" value="6615368661">
            <input type="hidden" name="addprd20240121781233605" value="0">
            <input type="hidden" name="tmpck20240121781233605" value="2310387805">
            <input type="hidden" name="stat20240121781233605" value="901">
            <input type="hidden" name="stat202401217812336051" value="901">
            <input type="hidden" name="hordprdseq20240121781233605" value="">

                
            <input type="hidden" name="guaranteeYN20240121781233605" value="N"> <!-- 안심보장서비스여부-->

            <input type="hidden" name="ordPrdSubStatCd_202401217812336051" value="">
            <input type="hidden" name="slctDlvClfCd_202401217812336051" value="">
            <input type="hidden" name="isPartRefundUnavailable_202401217812336051" value="false">
            <input type="hidden" name="reqReturnAlertMessage_202401217812336051" value="null">
            <input type="hidden" name="reqOrderDecisionAlertMessage_202401217812336051" value="null">


            <!--  주문번호의 첫줄일때만 class=first 사용한다. -->
            <!-- 첫줄은 top라인이 나오지 않게하기위해 first클래스 -->
                
            </tr><tr> 

                <!-- 주문일자 시작 -->
                    
                <td class="first" rowspan="1"><!-- 각줄의 첫번째칸 왼쪽라인은 안나오게 하기위해서 first 클래스 삽입 -->
                    <input type="hidden" id="prdTypCd20240121781233605" value="01">
                    <!-- [PROJ-101] 아파트 관리비 서비스를 식별하기 위함(ord_path_clf : 96) -->
                    <input type="hidden" id="ordPathClf20240121781233605" value="02">
                    
                    <p class="odr_date"><a href="javascript:goOrderDetail('20240121781233605');" class="bt_detailview" row-num="1" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:2}">2024-01-21
                        <br>(20240121781233605)</a></p>

                    <p><a href="javascript:goOrderDetail('20240121781233605');" class="bt_detailview" row-num="1" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:2}"><span>상세보기</span></a></p>
                    
                    <!-- 전세계 배송 추가금 결제 -->
                    

                    

                    

                </td>
                    

                <!-- 주문일자 끝 -->
                <!-- 주문상품정보 시작 -->
                <!--  같은주문번호에서 셀병합이 되지 않는 TD의 경우   같은주문번호의 마지막 TD는 class를 제거한다(굵은라인)-->
                <!-- 속해있는 내용들의 bottom라인은 좀더 옅은 회색이 되야해서 line0클래스 삽입 -->
                    
                <td>
                    <!-- 주문시 상품정보 표시할 레이어 -->
                    <div class="orderProdInfo_v2">
                        <label for="ck20240121781233605_1" class="chk"><input type="hidden" disabled="" name="ck20240121781233605" id="ck20240121781233605_1" value="1"></label>
                        <span class="img">
									
										<img src="https://cdn.011st.com/11dims/resize/80/11src/product/6615368661/L300.jpg?427000000" alt="" onerror="javascript:this.src='//s.011st.com/img/product/no_image_80.gif';">
									
								</span>

                        <div class="cont  ">
                            <p>
                                <span class="ic_lowprice"><em>최저가보상</em></span>
                                
                                
                                
                                
                            </p>
                            <p>
                                
                                
                                
                                
                                        
                                            <a href="#" id="a_layer_orderDetail_20240121781233605_0" ord-no="20240121781233605" row-num="1" role="button" aria-expanded="false" onclick="goProductDetailLayer('//buy.11st.co.kr','20240121781233605', '1', '6615368661', 'layer_orderDetail_20240121781233605_0');this.setAttribute('aria-expanded','true');return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="order_list" data-log-body="{&quot;position_l2&quot;:2,&quot;order_no&quot;:&quot;20240121781233605&quot;}">
                                        

                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                                SK매직 방수비데 BID-E16D  IPX6등급 무필터 자가설치
                                        
                                            </a>
                                        
                                
                                
                                
                            </p>
                            
                            
                            <p class="op">
                                설치방법:자가설치(택배발송)
                            </p>
                            
                            

                            

                            

                            

                            

                            <div class="multiple_btn_box">
                                
                                
                            </div>
                        </div>
                        <div id="layer_orderDetail_20240121781233605_0" class="layer_relative"></div>
                        
                    </div>
                </td>
                <!-- 주문상품정보 끝-->
                <!-- 주문금액 시작 -->
                    
                <td>
                    <p class="fnt_1">
                        
                        
                        <strong>139,000원</strong>
                        
                        
                        
                        <br>(1개)
                        

                        <!--2009-10-09 정보입력버튼 추가-->
                        
                    </p>
                </td>
                <!-- 주문금액 종료-->
                <!-- 배송비 시작-->
                    
                    
                <td rowspan="1">
                    

                    
                    <p class="fnt_2">무료
                        
                    </p>
                    <!-- 2011-05-02 추가 -->
                    
                    <!-- //레이어 -->
                    <!-- //2011-05-02 추가 -->


                    
                    
                    <!--  하나의 묶음번호에 판매자가 1명일때 -->
                    
                    <div class="shopinfo_wrap">
                        
                        <strong><a href="#" class="shop_box_seller" id="a_shopBox_1" ord-no="20240121781233605" row-num="1" onclick="goSellerInfo('I1v38bWwoVMoF3Z3zSgC2A==', '20240121781233605', 'true');" onmouseover="layerView('shopBox_1');$(this).attr('aria-expanded', 'true');" target="_blank" aria-expanded="false" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller" data-log-body="{&quot;position_l2&quot;:2,&quot;order_no&quot;:&quot;20240121781233605&quot;}">best0314 <span class="skip">판매자 정보보기</span>
                        </a></strong>
                        
                            
                            
                        <div class="shop_box" id="shopBox_1">
                            <ul>
                                
                                <li>
                                    <a class="shop_box_btn" href="#" onclick="goSellerInfo('I1v38bWwoVMoF3Z3zSgC2A==', '20240121781233605', 'true');" target="_blank" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;판매자 정보&quot;}">판매자 정보</a></li>
                                
                                
                                <li>
                                    <a class="shop_box_btn" href="javascript:insertFavorShopPopup('I1v38bWwoVMoF3Z3zSgC2A==' ,'1208677', '20240121781233605');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어찜&quot;}">스토어찜</a>
                                </li>
                                
                                <li><a class="shop_box_btn" href="javascript:goStore('6615368661', '20240121781233605', '45298971','N','0', 'false', '');" onmouseout="layerHidden('shopBox_1');$('#a_shopBox_1').attr('aria-expanded', 'false');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어 방문&quot;}">스토어 방문</a></li>
                            </ul>
                        </div>
                            

                        </div>

                        
                        <!--  하나의 묶음번호에 판매자가 여러명일때 -->
                            
                            
                    
                </td>
                    
                <!-- 배송비 종료-->
                <!-- 주문상태 시작-->
                    
                <td class="td-center">
                    <div class="my-list-sell">
                        
                    <span class="fc_blue">구매확정</span>
                    	
                        
                            
                        <div class="lay_globalwrap">
                            <div id="arrivalScheDlvDtLayer_1" class="lay_ty" style="display:none;">
                                <h3>배송안내</h3>
                                
                                    <div class="list_pr em">판매자, 택배사 사정으로 예측치와 다를 수 있습니다.</div>
                                
                            </div>
                        </div>
                        
                        

                        
			            
			            




<p class="my-list-sell__row">
    <a href="javascript:goDeliveryTracking('2311338472', '00012');" onclick="rakeLog.sendRakeLog(this);" class="mytmall_bt01 c-button-my c-button-my--normal" ord-no="20240121781233605" row-num="1" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;배송조회&quot;,&quot;position_l2&quot;:2,&quot;order_no&quot;:&quot;20240121781233605&quot;}">배송조회</a></p>

<!-- 발송지연 안내문구 추가 :S -->

<!-- //배송지연공지 안내 팝업 -->
<!-- 발송지연 안내문구 추가 :E-->

<p class="my-list-sell__row">
    <a href="javascript:sellerQnaWrite('20240121781233605', '1', '6615368661');" class="mytmall_bt01 c-button-my c-button-my--normal" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;판매자문의&quot;}">판매자문의</a>
</p>

</div>
</td>
<!-- 주문상태 종료-->
<!-- 처리버튼시작-->

<td class="gray">

<div class="my-list-sell">

</div>
</td>

            <input type="hidden" name="addPrdYn202311067466133702" value="N">
                
            <input type="hidden" name="isMainPrd202311067466133702" value="N">
            <input type="hidden" name="ingCancelAddPrds202311067466133702" value="N">
            <input type="hidden" name="ingReturnAddPrds202311067466133702" value="N">
            <input type="hidden" name="ingChangeAddPrds202311067466133702" value="N">
            <input type="hidden" name="ordQtySum202311067466133702" value="1">
            <input type="hidden" name="ordQtySum20231106746613370" value="1">
            <input type="hidden" name="isAppleCareProducts202311067466133702" value="false">
            <input type="hidden" name="ordPrdSeq20231106746613370">
            <input type="hidden" name="prdNm20231106746613370" value="Dickies 남성용 루즈 핏 더블 니 트윌 워크 팬츠 작업 바지, 다크 브라운, 36W x 30L">
            <input type="hidden" name="dispOptNm20231106746613370" value="선택옵션:Dark Brown, 36W x 30L">
            <input type="hidden" name="addPrdYn20231106746613370" value="N">
            <input type="hidden" name="prdNo20231106746613370" value="3586371268">
            <input type="hidden" name="rejectReturnYn_202311067466133702" value="N">
            <input type="hidden" name="rejectExchangeYn_202311067466133702" value="N">
            <input type="hidden" name="freeReturnYn_202311067466133702" value="N">
            <input type="hidden" name="dlvClf_202311067466133702" value="02">
            <input type="hidden" name="ordCnStepCd_202311067466133702" value="">
            <input type="hidden" name="pyinMonQty_202311067466133702" value="0">
            <input type="hidden" name="sellerNo_202311067466133702" value="N">
            <input type="hidden" name="sellerMemNo_20231106746613370" value="66852156">
            <input type="hidden" name="isYes24_202311067466133702" value="false">
            <input type="hidden" name="isNotExchangeYn_202311067466133702" value="N">
            <input type="hidden" name="isBtnClaimYn_20231106746613370" value="N">
            <input type="hidden" name="isHomePlus_202311067466133702" value="N">
            <input type="hidden" name="isEmart_202311067466133702" value="N">
            <input type="hidden" name="isLottemart_202311067466133702" value="N">
            <input type="hidden" name="isLottemartOM_202311067466133702" value="N">
            <input type="hidden" name="isSsg_202311067466133702" value="N">
            <input type="hidden" name="isDutyFreeSeller_202311067466133702" value="N">
            <input type="hidden" name="isAcmeOrderYn_202311067466133702" value="Y">
            <input type="hidden" name="isShootingWater_202311067466133702" value="false">

            <input type="hidden" name="vcenterClmCnt_202311067466133702" value="0">

                

            <input type="hidden" name="prd20231106746613370" value="3586371268">
            <input type="hidden" name="addprd20231106746613370" value="0">
            <input type="hidden" name="tmpck20231106746613370" value="2274139602">
            <input type="hidden" name="stat20231106746613370" value="901">
            <input type="hidden" name="stat202311067466133702" value="901">
            <input type="hidden" name="hordprdseq20231106746613370" value="">

                
            <input type="hidden" name="guaranteeYN20231106746613370" value="N"> <!-- 안심보장서비스여부-->

            <input type="hidden" name="ordPrdSubStatCd_202311067466133702" value="">
            <input type="hidden" name="slctDlvClfCd_202311067466133702" value="">
            <input type="hidden" name="isPartRefundUnavailable_202311067466133702" value="false">
            <input type="hidden" name="reqReturnAlertMessage_202311067466133702" value="null">
            <input type="hidden" name="reqOrderDecisionAlertMessage_202311067466133702" value="null">


            <!--  주문번호의 첫줄일때만 class=first 사용한다. -->
            <!-- 첫줄은 top라인이 나오지 않게하기위해 first클래스 -->
                
            </tr><tr> 

                <!-- 주문일자 시작 -->
                    
                <td class="first" rowspan="1"><!-- 각줄의 첫번째칸 왼쪽라인은 안나오게 하기위해서 first 클래스 삽입 -->
                    <input type="hidden" id="prdTypCd20231106746613370" value="01">
                    <!-- [PROJ-101] 아파트 관리비 서비스를 식별하기 위함(ord_path_clf : 96) -->
                    <input type="hidden" id="ordPathClf20231106746613370" value="02">
                    
                    <p class="odr_date"><a href="javascript:goOrderDetail('20231106746613370');" class="bt_detailview" row-num="2" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:3}">2023-11-06
                        <br>(20231106746613370)</a></p>

                    <p><a href="javascript:goOrderDetail('20231106746613370');" class="bt_detailview" row-num="2" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:3}"><span>상세보기</span></a></p>
                    
                    <!-- 전세계 배송 추가금 결제 -->
                    

                    

                    

                </td>
                    

                <!-- 주문일자 끝 -->
                <!-- 주문상품정보 시작 -->
                <!--  같은주문번호에서 셀병합이 되지 않는 TD의 경우   같은주문번호의 마지막 TD는 class를 제거한다(굵은라인)-->
                <!-- 속해있는 내용들의 bottom라인은 좀더 옅은 회색이 되야해서 line0클래스 삽입 -->
                    
                <td>
                    <!-- 주문시 상품정보 표시할 레이어 -->
                    <div class="orderProdInfo_v2">
                        <label for="ck20231106746613370_2" class="chk"><input type="hidden" disabled="" name="ck20231106746613370" id="ck20231106746613370_2" value="2"></label>
                        <span class="img">
									
										<img src="https://cdn.011st.com/11dims/resize/80/11src/asin/B000N8TEB0/B.jpg?1733374731808" alt="" onerror="javascript:this.src='//s.011st.com/img/product/no_image_80.gif';">
									
								</span>

                        <div class="cont  ">
                            <p>
                                
                                
                                
                                
                                
                            </p>
                            <p>
                                
                                
                                
                                
                                        
                                            <a href="#" id="a_layer_orderDetail_20231106746613370_0" ord-no="20231106746613370" row-num="2" role="button" aria-expanded="false" onclick="goProductDetailLayer('//buy.11st.co.kr','20231106746613370', '2', '3586371268', 'layer_orderDetail_20231106746613370_0');this.setAttribute('aria-expanded','true');return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="order_list" data-log-body="{&quot;position_l2&quot;:3,&quot;order_no&quot;:&quot;20231106746613370&quot;}">
                                        

                                            
                                            
                                            
                                                <span class="c_icon_sktpass">우주패스</span>
                                            
                                            
                                            
                                            
                                            
                                                Dickies 남성용 루즈 핏 더블 니 트윌 워크 팬츠 작업 바지, 다크 브라운, 36W x 30L
                                        
                                            </a>
                                        
                                
                                
                                
                            </p>
                            
                            
                            <p class="op">
                                선택옵션:Dark Brown<br> 36W x 30L
                            </p>
                            
                            

                            

                            

                            

                            

                            <div class="multiple_btn_box">
                                
                                
                            </div>
                        </div>
                        <div id="layer_orderDetail_20231106746613370_0" class="layer_relative"></div>
                        
                    </div>
                </td>
                <!-- 주문상품정보 끝-->
                <!-- 주문금액 시작 -->
                    
                <td>
                    <p class="fnt_1">
                        
                        
                        <strong>47,090원</strong>
                        
                        
                        
                        <br>(1개)
                        

                        <!--2009-10-09 정보입력버튼 추가-->
                        
                    </p>
                </td>
                <!-- 주문금액 종료-->
                <!-- 배송비 시작-->
                    
                    
                <td rowspan="1">
                    

                    
                    <p class="fnt_2">무료
                        
                    </p>
                    <!-- 2011-05-02 추가 -->
                    
                    <!-- //레이어 -->
                    <!-- //2011-05-02 추가 -->


                    
                    
                    <!--  하나의 묶음번호에 판매자가 1명일때 -->
                    
                    <div class="shopinfo_wrap">
                        
                        <p><a href="https://www.11st.co.kr/display-view/acme/main"><span class="c_bi_amazon">Amazon</span></a></p>
                        <p class="fnt_1">미국</p>
                        
                            
                            
                        <div class="shop_box" id="shopBox_2">
                            <ul>
                                
                                
                                <li>
                                    <a class="shop_box_btn" href="javascript:insertFavorShopPopup('F+5vPVll9K7RHU5jDn1Mqg==' ,'1397056', '20231106746613370');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어찜&quot;}">스토어찜</a>
                                </li>
                                
                                <li><a class="shop_box_btn" href="javascript:goStore('3586371268', '20231106746613370', '66852156','N','0', 'false', '');" onmouseout="layerHidden('shopBox_2');$('#a_shopBox_2').attr('aria-expanded', 'false');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어 방문&quot;}">스토어 방문</a></li>
                            </ul>
                        </div>
                            

                        </div>

                        
                        <!--  하나의 묶음번호에 판매자가 여러명일때 -->
                            
                            
                    
                </td>
                    
                <!-- 배송비 종료-->
                <!-- 주문상태 시작-->
                    
                <td class="td-center">
                    <div class="my-list-sell">
                        
                    <span class="fc_blue">구매확정</span>
                    	
                        
                            
                        <div class="lay_globalwrap">
                            <div id="arrivalScheDlvDtLayer_2" class="lay_ty" style="display:none;">
                                <h3>배송안내</h3>
                                
                                    <div class="list_pr em">판매자, 택배사 사정으로 예측치와 다를 수 있습니다.</div>
                                
                            </div>
                        </div>
                        
                        

                        
			            
			            




<p class="my-list-sell__row">
    <a href="javascript:goDeliveryTracking('2274139602', '00045');" onclick="rakeLog.sendRakeLog(this);" class="mytmall_bt01 c-button-my c-button-my--normal" ord-no="20231106746613370" row-num="2" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;배송조회&quot;,&quot;position_l2&quot;:3,&quot;order_no&quot;:&quot;20231106746613370&quot;}">배송조회</a></p>

<!-- 발송지연 안내문구 추가 :S -->

<!-- //배송지연공지 안내 팝업 -->
<!-- 발송지연 안내문구 추가 :E-->

<p class="my-list-sell__row">
    <a href="javascript:sellerQnaWrite('20231106746613370', '2', '3586371268');" class="mytmall_bt01 c-button-my c-button-my--normal" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;판매자문의&quot;}">판매자문의</a>
</p>

</div>
</td>
<!-- 주문상태 종료-->
<!-- 처리버튼시작-->

<td class="gray">

<div class="my-list-sell">

</div>
</td>

            <input type="hidden" name="addPrdYn202311067466075331" value="N">
                
            <input type="hidden" name="isMainPrd202311067466075331" value="N">
            <input type="hidden" name="ingCancelAddPrds202311067466075331" value="N">
            <input type="hidden" name="ingReturnAddPrds202311067466075331" value="N">
            <input type="hidden" name="ingChangeAddPrds202311067466075331" value="N">
            <input type="hidden" name="ordQtySum202311067466075331" value="1">
            <input type="hidden" name="ordQtySum20231106746607533" value="1">
            <input type="hidden" name="isAppleCareProducts202311067466075331" value="false">
            <input type="hidden" name="ordPrdSeq20231106746607533">
            <input type="hidden" name="prdNm20231106746607533" value="[신세계몰]디키즈 더블니 85283 면바지 워크팬츠 블랙 BLACK">
            <input type="hidden" name="dispOptNm20231106746607533" value="사이즈:허리36X기장30">
            <input type="hidden" name="addPrdYn20231106746607533" value="N">
            <input type="hidden" name="prdNo20231106746607533" value="6279664833">
            <input type="hidden" name="rejectReturnYn_202311067466075331" value="N">
            <input type="hidden" name="rejectExchangeYn_202311067466075331" value="N">
            <input type="hidden" name="freeReturnYn_202311067466075331" value="N">
            <input type="hidden" name="dlvClf_202311067466075331" value="02">
            <input type="hidden" name="ordCnStepCd_202311067466075331" value="08">
            <input type="hidden" name="pyinMonQty_202311067466075331" value="">
            <input type="hidden" name="sellerNo_202311067466075331" value="N">
            <input type="hidden" name="sellerMemNo_20231106746607533" value="41407634">
            <input type="hidden" name="isYes24_202311067466075331" value="true">
            <input type="hidden" name="isNotExchangeYn_202311067466075331" value="N">
            <input type="hidden" name="isBtnClaimYn_20231106746607533" value="N">
            <input type="hidden" name="isHomePlus_202311067466075331" value="N">
            <input type="hidden" name="isEmart_202311067466075331" value="N">
            <input type="hidden" name="isLottemart_202311067466075331" value="N">
            <input type="hidden" name="isLottemartOM_202311067466075331" value="N">
            <input type="hidden" name="isSsg_202311067466075331" value="Y">
            <input type="hidden" name="isDutyFreeSeller_202311067466075331" value="N">
            <input type="hidden" name="isAcmeOrderYn_202311067466075331" value="N">
            <input type="hidden" name="isShootingWater_202311067466075331" value="false">

            <input type="hidden" name="vcenterClmCnt_202311067466075331" value="0">

                

            <input type="hidden" name="prd20231106746607533" value="6279664833">
            <input type="hidden" name="addprd20231106746607533" value="0">
            <input type="hidden" name="tmpck20231106746607533" value="2274134427">
            <input type="hidden" name="stat20231106746607533" value="901">
            <input type="hidden" name="stat202311067466075331" value="901">
            <input type="hidden" name="hordprdseq20231106746607533" value="">

                
            <input type="hidden" name="guaranteeYN20231106746607533" value="N"> <!-- 안심보장서비스여부-->

            <input type="hidden" name="ordPrdSubStatCd_202311067466075331" value="702">
            <input type="hidden" name="slctDlvClfCd_202311067466075331" value="">
            <input type="hidden" name="isPartRefundUnavailable_202311067466075331" value="false">
            <input type="hidden" name="reqReturnAlertMessage_202311067466075331" value="null">
            <input type="hidden" name="reqOrderDecisionAlertMessage_202311067466075331" value="null">


            <!--  주문번호의 첫줄일때만 class=first 사용한다. -->
            <!-- 첫줄은 top라인이 나오지 않게하기위해 first클래스 -->
                
            </tr><tr> 

                <!-- 주문일자 시작 -->
                    
                <td class="first" rowspan="1"><!-- 각줄의 첫번째칸 왼쪽라인은 안나오게 하기위해서 first 클래스 삽입 -->
                    <input type="hidden" id="prdTypCd20231106746607533" value="01">
                    <!-- [PROJ-101] 아파트 관리비 서비스를 식별하기 위함(ord_path_clf : 96) -->
                    <input type="hidden" id="ordPathClf20231106746607533" value="02">
                    
                    <p class="odr_date"><a href="javascript:goOrderDetail('20231106746607533');" class="bt_detailview" row-num="3" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:4}">2023-11-06
                        <br>(20231106746607533)</a></p>

                    <p><a href="javascript:goOrderDetail('20231106746607533');" class="bt_detailview" row-num="3" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:4}"><span>상세보기</span></a></p>
                    
                    <!-- 전세계 배송 추가금 결제 -->
                    

                    

                    

                </td>
                    

                <!-- 주문일자 끝 -->
                <!-- 주문상품정보 시작 -->
                <!--  같은주문번호에서 셀병합이 되지 않는 TD의 경우   같은주문번호의 마지막 TD는 class를 제거한다(굵은라인)-->
                <!-- 속해있는 내용들의 bottom라인은 좀더 옅은 회색이 되야해서 line0클래스 삽입 -->
                    
                <td>
                    <!-- 주문시 상품정보 표시할 레이어 -->
                    <div class="orderProdInfo_v2">
                        <label for="ck20231106746607533_1" class="chk"><input type="hidden" disabled="" name="ck20231106746607533" id="ck20231106746607533_1" value="1"></label>
                        <span class="img">
									
										<img src="https://cdn.011st.com/11dims/resize/80/11src/product/6279664833/B.jpg?185000000" alt="" onerror="javascript:this.src='//s.011st.com/img/product/no_image_80.gif';">
									
								</span>

                        <div class="cont  ">
                            <p>
                                <span class="ic_lowprice"><em>최저가보상</em></span>
                                
                                
                                
                                
                            </p>
                            <p>
                                
                                
                                
                                
                                        
                                            <a href="#" id="a_layer_orderDetail_20231106746607533_0" ord-no="20231106746607533" row-num="3" role="button" aria-expanded="false" onclick="goProductDetailLayer('//buy.11st.co.kr','20231106746607533', '1', '6279664833', 'layer_orderDetail_20231106746607533_0');this.setAttribute('aria-expanded','true');return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="order_list" data-log-body="{&quot;position_l2&quot;:4,&quot;order_no&quot;:&quot;20231106746607533&quot;}">
                                        

                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                                [신세계몰]디키즈 더블니 85283 면바지 워크팬츠 블랙 BLACK
                                        
                                            </a>
                                        
                                
                                
                                
                            </p>
                            
                            
                            <p class="op">
                                사이즈:허리36X기장30
                            </p>
                            
                            

                            

                            

                            

                            

                            <div class="multiple_btn_box">
                                
                                
                            </div>
                        </div>
                        <div id="layer_orderDetail_20231106746607533_0" class="layer_relative"></div>
                        
                    </div>
                </td>
                <!-- 주문상품정보 끝-->
                <!-- 주문금액 시작 -->
                    
                <td>
                    <p class="fnt_1">
                        
                        
                        <strong>48,270원</strong>
                        
                        
                        
                        <br>(1개)
                        

                        <!--2009-10-09 정보입력버튼 추가-->
                        
                    </p>
                </td>
                <!-- 주문금액 종료-->
                <!-- 배송비 시작-->
                    
                    
                <td rowspan="1">
                    

                    
                    <p class="fnt_2">3,000원
                        
                    </p>
                    <!-- 2011-05-02 추가 -->
                    
                    <!-- //레이어 -->
                    <!-- //2011-05-02 추가 -->


                    
                    
                    <!--  하나의 묶음번호에 판매자가 1명일때 -->
                    
                    <div class="shopinfo_wrap">
                        
                        <strong><a href="#" class="shop_box_seller" id="a_shopBox_3" ord-no="20231106746607533" row-num="3" onclick="goSellerInfo('gZjxZPKaUKqA+uz3RrRTVA==', '20231106746607533', 'true');" onmouseover="layerView('shopBox_3');$(this).attr('aria-expanded', 'true');" target="_blank" aria-expanded="false" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller" data-log-body="{&quot;position_l2&quot;:4,&quot;order_no&quot;:&quot;20231106746607533&quot;}">ssgmall01 <span class="skip">판매자 정보보기</span>
                        </a></strong>
                        
                            
                            
                        <div class="shop_box" id="shopBox_3">
                            <ul>
                                
                                <li>
                                    <a class="shop_box_btn" href="#" onclick="goSellerInfo('gZjxZPKaUKqA+uz3RrRTVA==', '20231106746607533', 'true');" target="_blank" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;판매자 정보&quot;}">판매자 정보</a></li>
                                
                                
                                <li>
                                    <a class="shop_box_btn" href="javascript:insertFavorShopPopup('gZjxZPKaUKqA+uz3RrRTVA==' ,'1136957', '20231106746607533');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어찜&quot;}">스토어찜</a>
                                </li>
                                
                                <li><a class="shop_box_btn" href="javascript:goStore('6279664833', '20231106746607533', '41407634','N','0', 'false', '');" onmouseout="layerHidden('shopBox_3');$('#a_shopBox_3').attr('aria-expanded', 'false');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어 방문&quot;}">스토어 방문</a></li>
                            </ul>
                        </div>
                            

                        </div>

                        
                        <!--  하나의 묶음번호에 판매자가 여러명일때 -->
                            
                            
                    
                </td>
                    
                <!-- 배송비 종료-->
                <!-- 주문상태 시작-->
                    
                <td class="td-center">
                    <div class="my-list-sell">
                        
                    <span class="fc_blue">구매확정</span>
                    	
                        
                            
                        <div class="lay_globalwrap">
                            <div id="arrivalScheDlvDtLayer_3" class="lay_ty" style="display:none;">
                                <h3>배송안내</h3>
                                
                                    <div class="list_pr em">판매자, 택배사 사정으로 예측치와 다를 수 있습니다.</div>
                                
                            </div>
                        </div>
                        
                        

                        
			            
			            




<p class="my-list-sell__row">
    <a href="javascript:goDeliveryTracking('2274134427', '00034');" onclick="rakeLog.sendRakeLog(this);" class="mytmall_bt01 c-button-my c-button-my--normal" ord-no="20231106746607533" row-num="3" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;배송조회&quot;,&quot;position_l2&quot;:4,&quot;order_no&quot;:&quot;20231106746607533&quot;}">배송조회</a></p>

<!-- 발송지연 안내문구 추가 :S -->

<!-- //배송지연공지 안내 팝업 -->
<!-- 발송지연 안내문구 추가 :E-->

<p class="my-list-sell__row">
    <a href="javascript:sellerQnaWrite('20231106746607533', '1', '6279664833');" class="mytmall_bt01 c-button-my c-button-my--normal" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;판매자문의&quot;}">판매자문의</a>
</p>

</div>
</td>
<!-- 주문상태 종료-->
<!-- 처리버튼시작-->

<td class="gray">

<div class="my-list-sell">

</div>
</td>

            <input type="hidden" name="addPrdYn202109202612787891" value="N">
                
            <input type="hidden" name="isMainPrd202109202612787891" value="N">
            <input type="hidden" name="ingCancelAddPrds202109202612787891" value="N">
            <input type="hidden" name="ingReturnAddPrds202109202612787891" value="N">
            <input type="hidden" name="ingChangeAddPrds202109202612787891" value="N">
            <input type="hidden" name="ordQtySum202109202612787891" value="1">
            <input type="hidden" name="ordQtySum20210920261278789" value="1">
            <input type="hidden" name="isAppleCareProducts202109202612787891" value="false">
            <input type="hidden" name="ordPrdSeq20210920261278789">
            <input type="hidden" name="prdNm20210920261278789" value="슈슈피클 개구리장아찌 인형 볼체인 피클 그린 13.5CM">
            <input type="hidden" name="dispOptNm20210920261278789" value="">
            <input type="hidden" name="addPrdYn20210920261278789" value="N">
            <input type="hidden" name="prdNo20210920261278789" value="3727135866">
            <input type="hidden" name="rejectReturnYn_202109202612787891" value="N">
            <input type="hidden" name="rejectExchangeYn_202109202612787891" value="N">
            <input type="hidden" name="freeReturnYn_202109202612787891" value="N">
            <input type="hidden" name="dlvClf_202109202612787891" value="02">
            <input type="hidden" name="ordCnStepCd_202109202612787891" value="">
            <input type="hidden" name="pyinMonQty_202109202612787891" value="0">
            <input type="hidden" name="sellerNo_202109202612787891" value="N">
            <input type="hidden" name="sellerMemNo_20210920261278789" value="38479226">
            <input type="hidden" name="isYes24_202109202612787891" value="false">
            <input type="hidden" name="isNotExchangeYn_202109202612787891" value="N">
            <input type="hidden" name="isBtnClaimYn_20210920261278789" value="N">
            <input type="hidden" name="isHomePlus_202109202612787891" value="N">
            <input type="hidden" name="isEmart_202109202612787891" value="N">
            <input type="hidden" name="isLottemart_202109202612787891" value="N">
            <input type="hidden" name="isLottemartOM_202109202612787891" value="N">
            <input type="hidden" name="isSsg_202109202612787891" value="N">
            <input type="hidden" name="isDutyFreeSeller_202109202612787891" value="N">
            <input type="hidden" name="isAcmeOrderYn_202109202612787891" value="N">
            <input type="hidden" name="isShootingWater_202109202612787891" value="false">

            <input type="hidden" name="vcenterClmCnt_202109202612787891" value="0">

                

            <input type="hidden" name="prd20210920261278789" value="3727135866">
            <input type="hidden" name="addprd20210920261278789" value="0">
            <input type="hidden" name="tmpck20210920261278789" value="1835001051">
            <input type="hidden" name="stat20210920261278789" value="901">
            <input type="hidden" name="stat202109202612787891" value="901">
            <input type="hidden" name="hordprdseq20210920261278789" value="">

                
            <input type="hidden" name="guaranteeYN20210920261278789" value="N"> <!-- 안심보장서비스여부-->

            <input type="hidden" name="ordPrdSubStatCd_202109202612787891" value="">
            <input type="hidden" name="slctDlvClfCd_202109202612787891" value="">
            <input type="hidden" name="isPartRefundUnavailable_202109202612787891" value="false">
            <input type="hidden" name="reqReturnAlertMessage_202109202612787891" value="null">
            <input type="hidden" name="reqOrderDecisionAlertMessage_202109202612787891" value="null">


            <!--  주문번호의 첫줄일때만 class=first 사용한다. -->
            <!-- 첫줄은 top라인이 나오지 않게하기위해 first클래스 -->
                
            </tr><tr> 

                <!-- 주문일자 시작 -->
                    
                <td class="first" rowspan="1"><!-- 각줄의 첫번째칸 왼쪽라인은 안나오게 하기위해서 first 클래스 삽입 -->
                    <input type="hidden" id="prdTypCd20210920261278789" value="01">
                    <!-- [PROJ-101] 아파트 관리비 서비스를 식별하기 위함(ord_path_clf : 96) -->
                    <input type="hidden" id="ordPathClf20210920261278789" value="01">
                    
                    <p class="odr_date"><a href="javascript:goOrderDetail('20210920261278789');" class="bt_detailview" row-num="4" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:5}">2021-09-20
                        <br>(20210920261278789)</a></p>

                    <p><a href="javascript:goOrderDetail('20210920261278789');" class="bt_detailview" row-num="4" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="more" data-log-body="{&quot;btn_name&quot;:&quot;상세보기&quot;,&quot;position_l2&quot;:5}"><span>상세보기</span></a></p>
                    
                    <!-- 전세계 배송 추가금 결제 -->
                    

                    

                    

                </td>
                    

                <!-- 주문일자 끝 -->
                <!-- 주문상품정보 시작 -->
                <!--  같은주문번호에서 셀병합이 되지 않는 TD의 경우   같은주문번호의 마지막 TD는 class를 제거한다(굵은라인)-->
                <!-- 속해있는 내용들의 bottom라인은 좀더 옅은 회색이 되야해서 line0클래스 삽입 -->
                    
                <td>
                    <!-- 주문시 상품정보 표시할 레이어 -->
                    <div class="orderProdInfo_v2">
                        <label for="ck20210920261278789_1" class="chk"><input type="hidden" disabled="" name="ck20210920261278789" id="ck20210920261278789_1" value="1"></label>
                        <span class="img">
									
										<img src="https://cdn.011st.com/11dims/resize/80/11src/product/3727135866/L300.jpg?660000000" alt="" onerror="javascript:this.src='//s.011st.com/img/product/no_image_80.gif';">
									
								</span>

                        <div class="cont  ">
                            <p>
                                <span class="ic_lowprice"><em>최저가보상</em></span>
                                
                                
                                
                                
                            </p>
                            <p>
                                <img src="//www.11st.co.kr/img/common/icon/flag_global.gif" alt="해외항공배송상품(배송 15일 소요예정)
193-13 301 Ganeung 1(il)-dong Uijeongbu-si Gyeonggi-do 480-804 Korea">
                                
                                
                                
                                        
                                            <a href="#" id="a_layer_orderDetail_20210920261278789_0" ord-no="20210920261278789" row-num="4" role="button" aria-expanded="false" onclick="goProductDetailLayer('//buy.11st.co.kr','20210920261278789', '1', '3727135866', 'layer_orderDetail_20210920261278789_0');this.setAttribute('aria-expanded','true');return false;" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="order_list" data-log-body="{&quot;position_l2&quot;:5,&quot;order_no&quot;:&quot;20210920261278789&quot;}">
                                        

                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                                슈슈피클 개구리장아찌 인형 볼체인 피클 그린 13.5CM
                                        
                                            </a>
                                        
                                
                                
                                
                            </p>
                            
                            
                            <p></p>
                            
                            

                            

                            

                            

                            

                            <div class="multiple_btn_box">
                                
                                
                            </div>
                        </div>
                        <div id="layer_orderDetail_20210920261278789_0" class="layer_relative"></div>
                        
                    </div>
                </td>
                <!-- 주문상품정보 끝-->
                <!-- 주문금액 시작 -->
                    
                <td>
                    <p class="fnt_1">
                        
                        
                        <strong>23,130원</strong>
                        
                        
                        
                        <br>(1개)
                        

                        <!--2009-10-09 정보입력버튼 추가-->
                        
                    </p>
                </td>
                <!-- 주문금액 종료-->
                <!-- 배송비 시작-->
                    
                    
                <td rowspan="1">
                    

                    
                    <p class="fnt_2">9,900원
                        
                    </p>
                    <!-- 2011-05-02 추가 -->
                    
                    <!-- //레이어 -->
                    <!-- //2011-05-02 추가 -->


                    
                    
                    <!--  하나의 묶음번호에 판매자가 1명일때 -->
                    
                    <div class="shopinfo_wrap">
                        
                        <strong><a href="#" class="shop_box_seller" id="a_shopBox_4" ord-no="20210920261278789" row-num="4" onclick="goSellerInfo('hylviCDV3D5bax4F8tviHw==', '20210920261278789', 'false');" onmouseover="layerView('shopBox_4');$(this).attr('aria-expanded', 'true');" target="_blank" aria-expanded="false" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller" data-log-body="{&quot;position_l2&quot;:5,&quot;order_no&quot;:&quot;20210920261278789&quot;}">neoglobal7 <span class="skip">판매자 정보보기</span>
                        </a></strong>
                        
                            
                            
                        <div class="shop_box" id="shopBox_4">
                            <ul>
                                
                                
                                <li>
                                    <a class="shop_box_btn" href="javascript:insertFavorShopPopup('hylviCDV3D5bax4F8tviHw==' ,'1068446', '20210920261278789');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어찜&quot;}">스토어찜</a>
                                </li>
                                
                                <li><a class="shop_box_btn" href="javascript:goStore('3727135866', '20210920261278789', '38479226','N','0', 'false', '');" onmouseout="layerHidden('shopBox_4');$('#a_shopBox_4').attr('aria-expanded', 'false');" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="seller_btn" data-log-body="{&quot;btn_name&quot;:&quot;스토어 방문&quot;}">스토어 방문</a></li>
                            </ul>
                        </div>
                            

                        </div>

                        
                        <!--  하나의 묶음번호에 판매자가 여러명일때 -->
                            
                            
                    
                </td>
                    
                <!-- 배송비 종료-->
                <!-- 주문상태 시작-->
                    
                <td class="td-center">
                    <div class="my-list-sell">
                        
                    <span class="fc_blue">구매확정</span>
                    	
                        
                            
                        <div class="lay_globalwrap">
                            <div id="arrivalScheDlvDtLayer_4" class="lay_ty" style="display:none;">
                                <h3>배송안내</h3>
                                
                                    <div class="list_pr em">판매자, 택배사 사정으로 예측치와 다를 수 있습니다.</div>
                                
                            </div>
                        </div>
                        
                        

                        
			            
			            




<p class="my-list-sell__row">
    <a href="javascript:goDeliveryTracking('1835001051', '00034');" onclick="rakeLog.sendRakeLog(this);" class="mytmall_bt01 c-button-my c-button-my--normal" ord-no="20210920261278789" row-num="4" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;배송조회&quot;,&quot;position_l2&quot;:5,&quot;order_no&quot;:&quot;20210920261278789&quot;}">배송조회</a></p>

<!-- 발송지연 안내문구 추가 :S -->

<!-- //배송지연공지 안내 팝업 -->
<!-- 발송지연 안내문구 추가 :E-->

<p class="my-list-sell__row">
    <a href="javascript:sellerQnaWrite('20210920261278789', '1', '3727135866');" class="mytmall_bt01 c-button-my c-button-my--normal" data-log-actionid-area="orderinfo_delivery" data-log-actionid-label="btn" data-log-body="{&quot;send_impression&quot;:&quot;Y&quot;,&quot;btn_name&quot;:&quot;판매자문의&quot;}">판매자문의</a>
</p>

</div>
</td>
<!-- 주문상태 종료-->
<!-- 처리버튼시작-->

<td class="gray">

<div class="my-list-sell">

</div>
</td>


</tr></tbody>
</table>
</form>
</div>
<div class="c_loading" style="display: none;">
    <p class="loading">데이터를 로딩 중입니다.</p>
</div>
<div class="c_modal c_modal_dimmed c_modal_mytmall_amazon_guide" id="ar-modal-info3" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="ar-modal-info-title">
    <div class="modal_inner dhl_booking">
        <div class="modal_header">
            <h2 id="ar-modal-info-title" class="title">DHL 예약하기</h2>
        </div>
        <div class="modal_content">
            <div class="dhl_booking_content">
                <h3 class="dhl_booking_title">픽업예약</h3>
                <p class="dhl_booking_message">DHL 픽업 예약을 진행해주세요.</p>
                <p class="dhl_booking_text">픽업 예약 링크 및 픽업 예약 가이드는 <em class="c_mytmall_point_2">안내톡/메일</em>에서도 확인할 수 있습니다.</p>
                <div class="waybill_number">
                    <div class="waybill_number_copy">
                        <strong class="number" id="waybill"></strong>
                        <button type="button" class="number_copy" onclick="copyToClipboard()">복사</button>
                    </div>
                    <p class="waybill_number_text">픽업 예약 시 필요한 운송장 번호를 복사하세요.</p>
                    <p class="waybill_number_subtext">Waybill Number</p>
                </div>
                <a href="javascript:window.open('https://mydhl.express.dhl/kr/ko/home.html'); void(0);" class="c_mytmall_button c_mytmall_button_style_3">온라인으로 픽업 예약하러 가기</a>
                <p class="dhl_booking_guide">픽업 예약관련 전화예약 및 문의는 <em class="c_mytmall_point_3">1588-0001</em>로 연락바랍니다.</p>
            </div>
        </div>
        <p class="modal_close"><button type="button" onclick="closeAcmePickUpLayer()">닫기</button></p>
    </div>
</div>
<!-- 게시판페이징:S-->

<!-- 메인에서 호출할때에는 페이지 제외 -->





<div class="s_paging">

	
	<a class="prev btn_paging" data-log-actionid-label="prev" data-log-actionid-area="paging" data-log-body="{}" data-is-ab-send="1"><span>이전목록</span></a>
	


	<span>


		<strong>1</strong>


	</span>

	
	<a class="next btn_paging" data-log-actionid-label="next" data-log-actionid-area="paging" data-log-body="{}"><span>다음목록</span></a>
	

</div>






<!--게시판페이징:E-->





<!-- 웹접근성 (Key Focus Event) -->


</div>`;
  const orderData = parseOrderTable(html);
  console.log(orderData);
  return <></>;
}
