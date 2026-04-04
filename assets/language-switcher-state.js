(function(){
    var select=document.getElementById('language-select');
    if(!select){
        return;
    }

    var labelByLocale={
        en:'EN',
        ja:'JA',
        ko:'KO',
        'zh-Hans':'ZH',
        vi:'VI',
        id:'ID'
    };
	    var flagByLocale={
	        en:'us',
	        ja:'jp',
	        ko:'kr',
	        'zh-Hans':'cn',
	        vi:'vn',
	        id:'id'
	    };
	    var script=document.currentScript;
	    var root=languageSwitcherRoot();
	    var flagImg=document.getElementById('language-flag');
	    var chevronIcon=root&&root.querySelector('.language-switcher__icon');
	    var flagBase='';
	    var pickerButton=null;
	    var pickerLabel=null;
	    var pickerMenu=null;
	    var optionButtons=[];
	    var isMenuOpen=false;
	    var viewToggle=document.getElementById('view-toggle');

	    function isLocalPreviewHost(){
	        var host=(location.hostname||'').toLowerCase();
	        return host==='localhost'||host==='127.0.0.1'||host==='::1'||host==='[::1]';
	    }

	    function isMobilePreview(){
	        return document.body.classList.contains('mobile-preview');
	    }

	    function isMobilePreviewQueryEnabled(){
	        return new URLSearchParams(location.search).get('view')==='mobile';
	    }

	    function updateViewToggleState(){
	        var label=null;

	        if(!viewToggle){
	            return;
	        }

	        label=viewToggle.querySelector('.view-toggle__label');
	        if(label){
	            label.textContent=isMobilePreview()?'PC':'Mobile';
	        }
	        viewToggle.setAttribute('aria-pressed',isMobilePreview()?'true':'false');
	    }

	    function updateCurrentPreviewQuery(enabled){
	        var currentPath=location.pathname+location.search+location.hash;
	        var url=new URL(location.href);
	        var nextPath='';

	        if(enabled){
	            url.searchParams.set('view','mobile');
	        }else{
	            url.searchParams.delete('view');
	        }
	        nextPath=url.pathname+url.search+url.hash;
	        if(nextPath!==currentPath){
	            history.replaceState(null,'',nextPath);
	        }
	    }

	    function isPreviewNavigableHref(href){
	        return !!href&&href.charAt(0)!=='#'&&!/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
	    }

	    function withPreviewQuery(href,enabled){
	        var hash='';
	        var query='';
	        var base=href;
	        var hashIndex=base.indexOf('#');
	        var queryIndex=-1;
	        var params=null;

	        if(hashIndex!==-1){
	            hash=base.slice(hashIndex);
	            base=base.slice(0,hashIndex);
	        }
	        queryIndex=base.indexOf('?');
	        if(queryIndex!==-1){
	            query=base.slice(queryIndex+1);
	            base=base.slice(0,queryIndex);
	        }
	        params=new URLSearchParams(query);
	        if(enabled){
	            params.set('view','mobile');
	        }else{
	            params.delete('view');
	        }
	        query=params.toString();
	        return base+(query?'?'+query:'')+hash;
	    }

	    function syncPreviewLinks(){
	        var enabled=isMobilePreview();
	        var links=document.querySelectorAll('a[href]');
	        var href='';
	        var index=0;

	        for(index=0;index<links.length;index+=1){
	            href=links[index].getAttribute('href');
	            if(!isPreviewNavigableHref(href)){
	                continue;
	            }
	            links[index].setAttribute('href',withPreviewQuery(href,enabled));
	        }
	    }

	    function setMobilePreview(enabled,options){
	        document.body.classList.toggle('mobile-preview',!!enabled);
	        updateViewToggleState();
	        syncPreviewLinks();
	        if(!options||options.syncHistory!==false){
	            updateCurrentPreviewQuery(!!enabled);
	        }
	    }

	    function bindViewToggle(){
	        if(!viewToggle){
	            return;
	        }

	        viewToggle.type='button';
	        viewToggle.onclick=function(event){
	            event.preventDefault();
	            setMobilePreview(!isMobilePreview());
	        };
	        updateViewToggleState();
	    }

	    function relocateViewToggle(){
	        var showViewToggle=isLocalPreviewHost();

	        document.body.classList.toggle('is-local-preview',showViewToggle);

        if(!viewToggle){
            return;
        }

        if(showViewToggle&&viewToggle.parentNode!==document.body){
            document.body.appendChild(viewToggle);
        }

	        if(showViewToggle){
	            viewToggle.hidden=false;
	            viewToggle.removeAttribute('aria-hidden');
	        }else{
	            viewToggle.hidden=true;
	            viewToggle.setAttribute('aria-hidden','true');
	        }
	        updateViewToggleState();
	    }

    function installWobblePointerTracking(){
        document.addEventListener('pointerdown',function(event){
            var wobbleContainer=event.target.closest('.wobble-container');
            var angle=0;

            if(!wobbleContainer){
                return;
            }

            angle=(Math.random()*30-15)|0;
            wobbleContainer.style.setProperty('--wobble-rotate',angle+'deg');
        });
    }

    function localeFromPath(path){
        var page=(path||'').split('?')[0].split('/').pop()||'index.html';
        if(page==='index.en.html'){
            return 'en';
        }
        if(page==='index.ja.html'){
            return 'ja';
        }
        if(page==='index.ko.html'){
            return 'ko';
        }
        if(page==='index.zh-Hans.html'){
            return 'zh-Hans';
        }
        if(page==='index.vi.html'){
            return 'vi';
        }
        if(page==='index.id.html'){
            return 'id';
        }
        if(page==='index.html'){
            return document.body.classList.contains('home-page')?'ja':'en';
        }
        return '';
    }

    function currentLocale(){
        return localeFromPath(location.pathname);
    }

    function languageSwitcherRoot(){
        return select.closest('.language-switcher, .document-language-switcher')||select.parentNode;
    }

    function ensureFlagBase(){
        if(flagBase){
            return flagBase;
        }
        if(flagImg){
            flagBase=(flagImg.getAttribute('src')||flagImg.src||'').replace(/[^/]+$/,'');
        }else if(script&&script.src){
            flagBase=script.src.replace(/language-switcher-state\.js(?:\?.*)?$/,'flags/');
        }
        return flagBase;
    }

    function ensureFlagImage(){
        if(flagImg){
            return flagImg;
        }
        if(!root){
            return null;
        }
        flagImg=document.createElement('img');
        flagImg.id='language-flag';
        flagImg.className='language-switcher__flag';
        flagImg.alt='';
        flagImg.setAttribute('aria-hidden','true');
        root.insertBefore(flagImg, select);
        return flagImg;
    }

    function ensureChevronIcon(){
        if(chevronIcon){
            return chevronIcon;
        }
        chevronIcon=document.createElement('div');
        chevronIcon.className='language-switcher__icon';
        chevronIcon.setAttribute('aria-hidden','true');
        chevronIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg>';
        return chevronIcon;
    }

    function normalizeOptions(){
        for(var i=0;i<select.options.length;i+=1){
            var option=select.options[i];
            var locale=localeFromPath(option.value);
            var label=labelByLocale[locale];
            var flag=flagByLocale[locale];
            if(label){
                option.text=label;
                option.label=label;
                option.textContent=label;
            }
            if(flag){
                option.setAttribute('data-flag',flag);
            }
        }
    }

    function matchingOption(){
        var locale=currentLocale();
        for(var i=0;i<select.options.length;i+=1){
            var option=select.options[i];
            if(localeFromPath(option.value)===locale){
                return option;
            }
        }
        return null;
    }

    function currentOption(){
        return select.options[select.selectedIndex]||null;
    }

    function currentOptionIndex(){
        return Math.max(0, select.selectedIndex);
    }

    function syncFlag(){
        var flag=ensureFlagImage();
        var base=ensureFlagBase();
        var option=currentOption();
        var locale=option&&localeFromPath(option.value);
        var flagCode=option&&(option.getAttribute('data-flag')||flagByLocale[locale]);

        if(flag&&base&&flagCode){
            flag.src=base+flagCode+'.svg';
        }
    }

    function resizeFallbackSelect(){
        if(root&&root.classList.contains('language-switcher--enhanced')){
            return;
        }

        var styles=getComputedStyle(select);
        var tmp=document.createElement('span');
        var horizontalPadding=parseFloat(styles.paddingLeft)+parseFloat(styles.paddingRight);
        var borderWidth=parseFloat(styles.borderLeftWidth)+parseFloat(styles.borderRightWidth);

        tmp.style.cssText='visibility:hidden;position:absolute;left:-9999px;top:-9999px;white-space:pre;';
        tmp.style.font=styles.font;
        tmp.style.letterSpacing=styles.letterSpacing;
        tmp.style.textTransform=styles.textTransform;
        tmp.textContent=currentOption() ? currentOption().text : '';
        document.body.appendChild(tmp);
        select.style.width=Math.ceil(tmp.getBoundingClientRect().width+horizontalPadding+borderWidth+2)+'px';
        tmp.remove();
    }

    function createMenuOption(option,index){
        var item=document.createElement('button');
        var flagCode=option.getAttribute('data-flag');
        var itemFlag=document.createElement('img');
        var itemLabel=document.createElement('span');

        item.type='button';
        item.className='language-picker__option';
        item.setAttribute('role','option');
        item.setAttribute('data-index',index);

        itemFlag.className='language-picker__option-flag';
        itemFlag.alt='';
        itemFlag.setAttribute('aria-hidden','true');
        if(flagCode){
            itemFlag.src=ensureFlagBase()+flagCode+'.svg';
        }

        itemLabel.className='language-picker__option-label';
        itemLabel.textContent=option.text;

        item.appendChild(itemFlag);
        item.appendChild(itemLabel);

        return item;
    }

    function buildCustomPicker(){
        if(!root||pickerButton){
            return;
        }

        var pickerId='language-picker-'+Math.random().toString(36).slice(2,10);
        var optionsWrap=document.createElement('div');

        pickerButton=document.createElement('button');
        pickerButton.type='button';
        pickerButton.className='language-picker__button toy-btn';
        pickerButton.setAttribute('aria-haspopup','listbox');
        pickerButton.setAttribute('aria-expanded','false');
        pickerButton.setAttribute('aria-label',select.getAttribute('aria-label')||'Language');
        pickerButton.setAttribute('aria-controls',pickerId);

        pickerLabel=document.createElement('span');
        pickerLabel.className='language-picker__label';

        pickerMenu=document.createElement('div');
        pickerMenu.id=pickerId;
        pickerMenu.className='language-picker__menu';
        pickerMenu.setAttribute('role','listbox');
        pickerMenu.setAttribute('aria-label',select.getAttribute('aria-label')||'Language');
        pickerMenu.hidden=true;

        optionsWrap.className='language-picker__options';
        pickerMenu.appendChild(optionsWrap);

        pickerButton.appendChild(ensureFlagImage());
        pickerButton.appendChild(pickerLabel);
        pickerButton.appendChild(ensureChevronIcon());

        root.appendChild(pickerButton);
        root.appendChild(pickerMenu);

        optionButtons=[];
        for(var i=0;i<select.options.length;i+=1){
            var item=createMenuOption(select.options[i],i);
            optionButtons.push(item);
            optionsWrap.appendChild(item);
        }

        root.classList.add('language-switcher--enhanced');
        select.tabIndex=-1;
        select.setAttribute('aria-hidden','true');

        pickerButton.addEventListener('click',function(){
            if(isMenuOpen){
                closeMenu({focusButton:false});
            }else{
                openMenu(currentOptionIndex());
            }
        });

        pickerButton.addEventListener('keydown',handleButtonKeydown);
        pickerMenu.addEventListener('click',handleMenuClick);
        pickerMenu.addEventListener('keydown',handleMenuKeydown);
        document.addEventListener('mousedown',handleDocumentPointerDown);
        document.addEventListener('keydown',handleDocumentKeydown);
    }

    function updateCustomPicker(){
        if(!pickerButton){
            return;
        }

        var option=currentOption();
        var label=option ? option.text : '';

        pickerLabel.textContent=label;
        pickerButton.setAttribute('aria-label',(select.getAttribute('aria-label')||'Language')+': '+label);

        for(var i=0;i<optionButtons.length;i+=1){
            var isSelected=i===currentOptionIndex();
            optionButtons[i].setAttribute('aria-selected',isSelected?'true':'false');
        }
    }

    function focusOption(index){
        if(!optionButtons.length){
            return;
        }
        var normalizedIndex=(index+optionButtons.length)%optionButtons.length;
        optionButtons[normalizedIndex].focus();
    }

    function openMenu(index){
        if(!pickerMenu||isMenuOpen){
            return;
        }

        isMenuOpen=true;
        root.classList.add('is-open');
        pickerMenu.hidden=false;
        pickerButton.setAttribute('aria-expanded','true');
        updateCustomPicker();

        window.requestAnimationFrame(function(){
            focusOption(typeof index==='number'?index:currentOptionIndex());
        });
    }

    function closeMenu(options){
        if(!pickerMenu||!isMenuOpen){
            return;
        }

        isMenuOpen=false;
        root.classList.remove('is-open');
        pickerMenu.hidden=true;
        pickerButton.setAttribute('aria-expanded','false');

        if(!options||options.focusButton!==false){
            pickerButton.focus();
        }
    }

    function chooseOption(index){
        if(index===currentOptionIndex()){
            closeMenu();
            return;
        }

        select.selectedIndex=index;
        select.value=select.options[index].value;
        syncLanguageSwitcherState();
        closeMenu({focusButton:false});
        window.location.href=resolvedOptionUrl(select.options[index].value);
    }

	    function resolvedOptionUrl(value){
	        var url=value;
	        if(isMobilePreview()){
	            url+=(url.indexOf('?')!==-1?'&':'?')+'view=mobile';
	        }
	        return url;
	    }

    function handleButtonKeydown(event){
        if(event.key==='ArrowDown'){
            event.preventDefault();
            openMenu(currentOptionIndex());
            return;
        }
        if(event.key==='ArrowUp'){
            event.preventDefault();
            openMenu(currentOptionIndex()-1);
            return;
        }
        if(event.key==='Enter'||event.key===' '){
            event.preventDefault();
            if(isMenuOpen){
                closeMenu({focusButton:false});
            }else{
                openMenu(currentOptionIndex());
            }
            return;
        }
        if(event.key==='Escape'){
            closeMenu({focusButton:false});
        }
    }

    function handleOptionKeydown(event,index){
        if(event.key==='ArrowDown'){
            event.preventDefault();
            focusOption(index+1);
            return;
        }
        if(event.key==='ArrowUp'){
            event.preventDefault();
            focusOption(index-1);
            return;
        }
        if(event.key==='Home'){
            event.preventDefault();
            focusOption(0);
            return;
        }
        if(event.key==='End'){
            event.preventDefault();
            focusOption(optionButtons.length-1);
            return;
        }
        if(event.key==='Escape'){
            event.preventDefault();
            closeMenu();
            return;
        }
        if(event.key==='Tab'){
            closeMenu({focusButton:false});
            return;
        }
        if(event.key==='Enter'||event.key===' '){
            event.preventDefault();
            chooseOption(index);
        }
    }

    function handleMenuClick(event){
        var item=event.target.closest('.language-picker__option');
        var index=item ? parseInt(item.getAttribute('data-index'),10) : NaN;
        if(!Number.isNaN(index)){
            chooseOption(index);
        }
    }

    function handleMenuKeydown(event){
        var item=event.target.closest('.language-picker__option');
        var index=item ? parseInt(item.getAttribute('data-index'),10) : NaN;
        if(!Number.isNaN(index)){
            handleOptionKeydown(event,index);
        }
    }

    function handleDocumentPointerDown(event){
        if(isMenuOpen&&root&&!root.contains(event.target)){
            closeMenu({focusButton:false});
        }
    }

    function handleDocumentKeydown(event){
        if(isMenuOpen&&event.key==='Escape'){
            event.preventDefault();
            closeMenu();
        }
    }

    function syncLanguageSwitcherState(){
        normalizeOptions();

        var option=matchingOption();
        if(option){
            select.value=option.value;
        }

        syncFlag();
        resizeFallbackSelect();
        buildCustomPicker();
        updateCustomPicker();
    }

	    setMobilePreview(isMobilePreviewQueryEnabled()||isMobilePreview(),{syncHistory:false});
	    relocateViewToggle();
	    bindViewToggle();
	    installWobblePointerTracking();
	    syncLanguageSwitcherState();
	    select.addEventListener('change',syncLanguageSwitcherState);
	    window.addEventListener('pageshow',function(){
	        setMobilePreview(isMobilePreviewQueryEnabled()||isMobilePreview(),{syncHistory:false});
	        closeMenu({focusButton:false});
	        syncLanguageSwitcherState();
	    });
	    window.addEventListener('resize',function(){
	        resizeFallbackSelect();
	        updateViewToggleState();
	    });
	    if(document.fonts&&document.fonts.ready){
	        document.fonts.ready.then(syncLanguageSwitcherState);
	    }
})();
