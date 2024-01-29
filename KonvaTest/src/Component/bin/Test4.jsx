import React, { useState } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Test4 = () => {
  return (
<div style={{width: '100%', height: '100%', position: 'relative', background: 'white'}}>
    <div style={{width: 32, height: 32, left: 1277, top: 52, position: 'absolute'}}>
        <div style={{width: 24, height: 20, left: 4, top: 2.67, position: 'absolute', border: '2px black solid'}}></div>
        <div style={{width: 4.61, height: 1.33, left: 13.69, top: 28, position: 'absolute', border: '2px black solid'}}></div>
    </div>
    <div style={{width: 48, height: 48, left: 1339, top: 43, position: 'absolute', background: '#AADEF5', borderRadius: 9999}} />
    <div style={{width: 1095, height: 256, left: 313, top: 128, position: 'absolute', background: 'linear-gradient(98deg, #6AA2B8 0%, #DFCFF7 100%)', boxShadow: '8px 8px 48px 8px rgba(0, 0, 0, 0.08)', borderRadius: 24, overflow: 'hidden'}}>
        <div style={{left: 68, top: 48, position: 'absolute', textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>January 17,  2024</div>
        <div style={{width: 320, left: 59, top: 135, position: 'absolute', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>정연우 님, 안녕하세요</div>
            <div style={{textAlign: 'center', color: 'rgba(255, 255, 255, 0.75)', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Get iDEA와 함께 좋은 아이디어를 구상해보세요</div>
        </div>
        <div style={{width: 274, height: 274, left: 762, top: -18, position: 'absolute', borderRadius: 9.13}} />
        <img style={{width: 426.99, height: 207.36, left: 653, top: 48.17, position: 'absolute', transform: 'rotate(-0.56deg)', transformOrigin: '0 0'}} src="https://via.placeholder.com/427x207" />
    </div>
    <div style={{width: 754, left: 313, top: 503, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex'}}>
        <div style={{width: 235.33, height: 221, paddingTop: 38, paddingBottom: 38, paddingLeft: 76, paddingRight: 74.47, background: 'white', boxShadow: '8px 8px 48px 8px rgba(0, 0, 0, 0.08)', borderRadius: 24, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 19, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex'}}>
                    <div style={{width: 84.86, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 10, display: 'flex'}}>
                        <div style={{width: 84.86, height: 59.43, position: 'relative'}}>
                            <div style={{width: 39.82, height: 14.41, left: 45.04, top: 45.01, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: 'linear-gradient(119deg, #6AA2B8 0%, #E2D4F7 100%)', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(119deg, #6AA2B8 0%, #E2D4F7 100%)', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px rgba(255, 255, 255, 0.20) solid'}} />
                            </div>
                            <div style={{width: 39.82, height: 14.41, left: 0, top: 45.01, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: 'linear-gradient(112deg, #6AA2B8 0%, #E2D4F7 100%)', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(112deg, #6AA2B8 0%, #E2D4F7 100%)', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px rgba(255, 255, 255, 0.20) solid'}} />
                            </div>
                            <div style={{width: 39.82, height: 14.41, left: 45.04, top: 33.50, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: 'linear-gradient(126deg, #6AA2B8 0%, #E2D4F7 100%)', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(126deg, #6AA2B8 0%, #E2D4F7 100%)', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px rgba(255, 255, 255, 0.20) solid'}} />
                            </div>
                            <div style={{width: 39.82, height: 14.41, left: 0, top: 33.50, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: '#6AA2B8', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: '#6AA2B8', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px #6AA2B8 solid'}} />
                                <div style={{width: 21.38, height: 1.64, left: 9.51, top: 2.96, position: 'absolute', background: '#6AA2B8', boxShadow: '5.264580249786377px 5.264580249786377px 5.264580249786377px ', borderRadius: 9999, filter: 'blur(5.26px)'}} />
                            </div>
                            <div style={{width: 39.82, height: 14.41, left: 45.02, top: 22.02, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: 'linear-gradient(119deg, #6AA2B8 0%, #E2D4F7 100%)', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(119deg, #6AA2B8 0%, #E2D4F7 100%)', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px rgba(255, 255, 255, 0.20) solid'}} />
                            </div>
                            <div style={{width: 39.82, height: 14.41, left: 45.02, top: 10.57, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: 'linear-gradient(127deg, #6AA2B8 0%, #E2D4F7 100%)', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(127deg, #6AA2B8 0%, #E2D4F7 100%)', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px rgba(255, 255, 255, 0.20) solid'}} />
                            </div>
                            <div style={{width: 39.82, height: 14.41, left: 39.43, top: 0, position: 'absolute'}}>
                                <div style={{width: 39.82, height: 10.59, left: 0, top: 3.83, position: 'absolute', background: 'linear-gradient(151deg, #6AA2B8 0%, #E2D4F7 100%)', border: '0.13px #6AA2B8 solid'}}></div>
                                <div style={{width: 39.82, height: 7.27, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(151deg, #6AA2B8 0%, #E2D4F7 100%)', boxShadow: '0px 0.7896870374679565px 2.105832099914551px rgba(174.04, 199.64, 229.50, 0.50)', borderRadius: 9999, border: '0.13px rgba(255, 255, 255, 0.20) solid'}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div style={{textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>프로젝트1</div>
                </div>
            </div>
        </div>
        <div style={{width: 235.33, height: 221, paddingTop: 71, paddingBottom: 39.25, paddingLeft: 75, paddingRight: 74.33, background: 'white', boxShadow: '8px 8px 48px 8px rgba(0, 0, 0, 0.08)', borderRadius: 24, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 19, display: 'inline-flex'}}>
                <div style={{width: 66.12, height: 61.75, position: 'relative'}}>
                    <div style={{width: 66.12, height: 61.75, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(111deg, #6AA2B8 0%, #E8EFFD 100%)', boxShadow: '2.895519256591797px 3.685206174850464px 15.793741226196289px rgba(98.46, 118.73, 147.69, 0.25)', border: '0.26px #6AA2B8 solid'}}></div>
                    <div style={{width: 5.19, height: 5.19, left: 55.91, top: 30.09, position: 'absolute', background: 'linear-gradient(180deg, #6AA2B8 16%, #F1F1F1 100%)', boxShadow: '0px 0.5264580249786377px 1.0529160499572754px rgba(0, 0, 0, 0.05)', borderRadius: 9999}} />
                    <div style={{width: 5.19, height: 5.19, left: 4.67, top: 25.94, position: 'absolute', background: 'linear-gradient(180deg, #6AA2B8 18%, #F1F1F1 100%)', boxShadow: '0px 0.5264580249786377px 1.0529160499572754px rgba(0, 0, 0, 0.05)', borderRadius: 9999}} />
                    <div style={{width: 23.20, height: 23.20, left: 21.29, top: 19.01, position: 'absolute', background: 'linear-gradient(180deg, rgba(228, 235, 247, 0.50) 0%, #D9E4F4 100%)', boxShadow: '-2.6322901248931885px -1.0529160499572754px 2.6322901248931885px rgba(255, 255, 255, 0.50)', borderRadius: 9999}} />
                    <div style={{width: 9.09, height: 19.39, left: 28.30, top: 21.09, position: 'absolute'}}>
                        <div style={{width: 9.09, height: 15.93, left: -0, top: 1.73, position: 'absolute', background: 'linear-gradient(180deg, #6AA2B8 0%, #7CADC2 14%, #E8EFFD 98%, #E8EFFD 100%)', border: '0.13px rgba(255, 255, 255, 0.33) solid'}}></div>
                        <div style={{width: 2.77, height: 6.23, left: 5.80, top: 0, position: 'absolute', background: 'linear-gradient(180deg, #6AA2B8 0%, #E8EFFD 100%)', borderRadius: 1.58, border: '0.13px rgba(255, 255, 255, 0.33) solid'}} />
                        <div style={{width: 2.77, height: 6.23, left: 0.60, top: 13.16, position: 'absolute', background: 'linear-gradient(180deg, #6AA2B8 0%, #E8EFFD 100%)', borderRadius: 1.58, border: '0.13px rgba(255, 255, 255, 0.33) solid'}} />
                    </div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div style={{textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>프로젝트2</div>
                </div>
            </div>
        </div>
        <div style={{width: 235.33, height: 221, paddingTop: 59, paddingBottom: 36, paddingLeft: 71, paddingRight: 70.33, background: 'white', boxShadow: '8px 8px 48px 8px rgba(0, 0, 0, 0.08)', borderRadius: 24, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 7, display: 'inline-flex'}}>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                <div style={{width: 94, height: 89, paddingTop: 16, paddingBottom: 14.73, paddingLeft: 9.46, paddingRight: 12.54, justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 72, height: 58.27, position: 'relative'}}>
                        <div style={{width: 72, height: 58.27, left: 0, top: 0, position: 'absolute', background: '#DEE9FF'}}></div>
                        <div style={{width: 47.75, height: 43.09, left: 14.90, top: 11, position: 'absolute'}}>
                            <div style={{width: 30.72, height: 29.08, left: 17.03, top: 14.01, position: 'absolute', background: '#A2BDFF'}}></div>
                            <div style={{width: 38.53, height: 36.48, left: 0, top: 0, position: 'absolute', background: '#418DF9'}}></div>
                            <div style={{width: 5.58, height: 5.29, left: 7.54, top: 16.66, position: 'absolute', background: 'white'}}></div>
                            <div style={{width: 5.58, height: 5.29, left: 15.64, top: 16.66, position: 'absolute', background: 'white'}}></div>
                            <div style={{width: 5.58, height: 5.29, left: 24.01, top: 16.66, position: 'absolute', background: 'white'}}></div>
                            <div style={{width: 10.05, height: 9.52, left: 30.44, top: 0, position: 'absolute', background: '#418DF9', border: '15px white solid'}}></div>
                            <div style={{width: 3.44, height: 5.11, left: 33.74, top: 2.20, position: 'absolute', background: 'white'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 19, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div style={{textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>프로젝트3</div>
                </div>
            </div>
        </div>
    </div>
    <div style={{left: 313, top: 442, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>최근 작업</div>
    <div style={{left: 984, top: 442, position: 'absolute', textAlign: 'center', color: '#6AA2B8', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>더 보기</div>
    <div style={{width: 288, height: 1024, left: 0, top: 0, position: 'absolute', background: '#F4F9FA'}}>
        <div style={{width: 192, paddingTop: 24, paddingBottom: 24, left: 48, top: 28, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <img style={{width: 41, height: 110}} src="https://via.placeholder.com/41x110" />
            <div style={{justifyContent: 'flex-start', alignItems: 'flex-end', gap: 4, display: 'flex'}}>
                <div style={{width: 117, color: 'black', fontSize: 26, fontFamily: 'Inter', fontWeight: '700', lineHeight: 30, wordWrap: 'break-word'}}>Get iDEA</div>
            </div>
        </div>
        <div style={{width: 227, paddingTop: 12, paddingBottom: 12, paddingLeft: 32, paddingRight: 24, left: 32, top: 186, position: 'absolute', background: 'white', boxShadow: '0px 2.703092575073242px 27.030925750732422px rgba(69, 69, 80, 0.10)', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{width: 105, color: '#A3A3A3', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>프로젝트 검색</div>
            <div style={{width: 24, height: 24, position: 'relative'}}>
                <div style={{width: 19, height: 19, left: 2, top: 2, position: 'absolute', border: '1.80px #656575 solid'}}></div>
            </div>
        </div>
        <div style={{width: 198, left: 32, top: 277, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 198, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'white', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                <div style={{width: 24, height: 24, position: 'relative'}}>
                    <div style={{width: 20.50, height: 20.50, left: 1.75, top: 1.75, position: 'absolute', background: 'rgba(0, 106, 255, 0.80)'}}></div>
                </div>
                <div style={{width: 124, height: 24, color: 'rgba(0, 106, 255, 0.80)', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', lineHeight: 24, wordWrap: 'break-word'}}>홈</div>
            </div>
            <div style={{paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                <div style={{width: 24, height: 24, paddingLeft: 4.65, paddingRight: 4.65, paddingTop: 2.81, paddingBottom: 2.81, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <div style={{width: 14.70, height: 18.38, position: 'relative'}}>
                        <div style={{width: 14.70, height: 18.38, left: 0, top: 0, position: 'absolute', border: '2px black solid'}}></div>
                        <div style={{width: 7.35, height: 0, left: 3.68, top: 13.78, position: 'absolute', border: '2px black solid'}}></div>
                        <div style={{width: 7.35, height: 0, left: 3.68, top: 10.11, position: 'absolute', border: '2px black solid'}}></div>
                        <div style={{width: 1.84, height: 0, left: 3.68, top: 6.43, position: 'absolute', border: '2px black solid'}}></div>
                        <div style={{width: 5.51, height: 5.51, left: 9.19, top: 0, position: 'absolute', border: '2px black solid'}}></div>
                    </div>
                </div>
                <div style={{width: 124, height: 24, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textTransform: 'capitalize', lineHeight: 24, wordWrap: 'break-word'}}>최근 작업</div>
            </div>
            <div style={{paddingTop: 12, paddingBottom: 12, paddingLeft: 11, paddingRight: 20, opacity: 0.75, borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 13, display: 'inline-flex'}}>
                <div style={{width: 30, height: 30, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                    <div style={{width: 30, height: 30}}></div>
                    <div style={{width: 17.50, height: 22.50, background: 'black'}}></div>
                </div>
                <div style={{width: 124, height: 24, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>즐겨찾기</div>
            </div>
        </div>
        <div style={{width: 218, height: 0, left: 26, top: 472, position: 'absolute', border: '1px #D7D7DB solid'}}></div>
        <div style={{width: 196, paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, left: 26, top: 488, position: 'absolute', opacity: 0.75, borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
            <div style={{width: 24, height: 24, position: 'relative'}}>
                <div style={{width: 7, height: 7, left: 14, top: 14, position: 'absolute', border: '2px black solid'}}></div>
                <div style={{width: 7, height: 7, left: 3, top: 14, position: 'absolute', border: '2px black solid'}}></div>
                <div style={{width: 7, height: 7, left: 14, top: 3, position: 'absolute', border: '2px black solid'}}></div>
                <div style={{width: 7, height: 7, left: 3, top: 3, position: 'absolute', border: '2px black solid'}}></div>
            </div>
            <div style={{width: 103, height: 24, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>모든 프로젝트</div>
            <div style={{width: 15, height: 9.26, background: '#B7B7B7'}}></div>
        </div>
    </div>
</div>
  );
};

export default Test4;
