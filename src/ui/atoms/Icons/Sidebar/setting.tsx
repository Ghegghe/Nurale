interface Props {
  size: number;
  color: string;
}

function Setting({ size, color }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 20 20'
    >
      <path
        fill={color}
        d='M11.78 2.801l-.995.1.995-.1zm-.06-.421l-.958.287.958-.287zm.175 1.175l-.929.37.929-.37zm1.323.548l-.395-.92.395.92zm.614-.452l-.555-.832-.04.027-.039.031.634.774zm0 0l.554.832.041-.027.038-.031-.633-.774zm.34-.255l-.475-.88.475.88zm1.035.051l.56-.828-.56.828zm.313.288l-.707.707.707-.707zm.745.745l.707-.707-.707.707zm.288.313l-.829.56.829-.56zm.051 1.035l.88.474-.88-.474zm-.255.34l.707.708.035-.036.032-.038-.774-.634zm0 0l-.707-.707-.035.036-.032.038.774.633zm-.452.614l-.919-.394.92.394zm.548 1.323l.371-.928-.37.928zm.754.115l-.1.995.1-.995zm.421.06l-.287.958.287-.958zm.695.768l.982-.19-.982.19zm0 1.904l-.982-.19.982.19zm-.695.768l-.287-.958.287.958zm-.421.06l-.1-.995.1.995zm-.753.115l-.37-.93.37.93zm-.548 1.323l.919-.395-.92.395zm.451.613l-.774.634.032.038.035.035.707-.707zm0 0l.774-.633-.031-.039-.036-.035-.707.707zm.255.34l-.88.476.88-.475zm-.051 1.036l-.829-.56.829.56zm-1.346 1.345l.56.829-.56-.829zm-1.035.052l-.474.88.474-.88zm-.34-.255l.633-.774-.038-.031-.04-.027-.555.832zm0 0l-.64.768.04.034.045.03.555-.832zm0 0l.64-.769-.007-.005-.633.774zm-.614-.452l-.395.919.395-.919zm-1.323.548l-.929-.37.929.37zm-.115.754l.995.1-.995-.1zm-.06.421l.958.287-.958-.287zm-.768.695l-.19-.982.19.982zm-1.904 0l-.19.982.19-.982zm-.768-.695l-.958.287.958-.287zm-.06-.421l.995-.1-.003-.032-.006-.033-.986.165zm0 0l-.995.1.003.032.006.032.986-.164zm-.115-.754l.929-.37-.929.37zm-1.323-.548l.395.92-.395-.92zm-.614.452l.634.774-.634-.774zm-.34.255l.474.88-.474-.88zm-1.035-.051l.56-.829-.56.829zm-.313-.288l-.707.707.707-.707zm-.745-.745l-.707.707.707-.707zm-.288-.313l-.828.56.828-.56zm-.051-1.035l.88.475-.88-.475zm.255-.34l.774.633.007-.009.007-.009-.788-.615zm0 0l-.768-.64-.01.011-.01.013.788.616zm0 0l.768.64.006-.007-.774-.633zm.452-.614l.919.394-.92-.394zm-.548-1.323l.37-.929-.37.929zM2.8 11.78l-.163.987.032.005.032.003.1-.995zm0 0l.163-.986-.032-.006-.031-.003-.1.995zm-.421-.06l-.287.958.287-.958zm-.695-.768l.982-.19-.982.19zm-.018-.425h-1 1zm0-1.053h1-1zm.018-.426l-.982-.19.982.19zm.695-.768l-.287-.958.287.958zm.421-.06l-.066-.998-.017.001-.016.002.1.995zm0 0l.067.998.016-.001.017-.002-.1-.995zm.754-.115l.371.929-.37-.929zm.548-1.323l.919-.394-.919.394zm-.452-.614l-.8.6.013.017.013.016.774-.633zm0 0l.8-.6-.013-.017-.013-.016-.774.633zm-.255-.34l.88-.475-.88.474zm.051-1.035l.829.56-.829-.56zm.288-.314l.707.707-.707-.707zm.745-.744l.707.707-.707-.707zm.313-.288l.56.829-.56-.829zm1.035-.052l.474-.88-.474.88zm.34.256l-.633.774.634-.774zm.614.451l.395-.919-.395.92zm1.323-.548l-.928-.37.928.37zm.115-.753l-.995-.1.995.1zm.06-.421l.958.287-.958-.287zm.768-.695l.19.982-.19-.982zm1.904 0l-.19.982.19-.982zm1.823 1.017c-.017-.175-.036-.402-.097-.609l-1.916.574c-.008-.025-.007-.032-.001.009.006.046.013.108.024.225l1.99-.2zm.048.482c.02.05.015.062 0-.039a12.907 12.907 0 01-.048-.443l-1.99.199c.02.199.038.378.058.523.02.139.05.32.123.502l1.857-.742zm0 0l-1.857.742a2 2 0 002.646 1.096l-.789-1.838zm.375-.307c-.168.137-.27.221-.347.28-.082.06-.077.048-.028.027l.79 1.838c.178-.077.329-.184.44-.268.118-.088.257-.202.412-.33l-1.267-1.547zm.079-.058l1.11 1.664-1.11-1.664zm.42-.303c-.19.102-.363.25-.499.361l1.267 1.548c.09-.074.14-.114.176-.142.033-.025.029-.02.006-.007l-.95-1.76zm2.07.103a2 2 0 00-2.07-.103l.95 1.76 1.12-1.657zm.46.41c-.124-.125-.282-.29-.46-.41l-1.12 1.657c-.022-.015-.025-.02.005.008.034.031.078.076.161.158l1.414-1.414zm.745.744l-.745-.745-1.414 1.414.745.745 1.414-1.414zm.41.46c-.122-.178-.286-.336-.41-.46l-1.414 1.414c.082.083.127.127.158.16.029.031.023.028.008.006l1.657-1.12zm.102 2.07a2 2 0 00-.103-2.07l-1.657 1.12 1.76.95zm-.361.499c.111-.136.259-.31.361-.5l-1.76-.949c.012-.023.018-.027-.007.006a7.613 7.613 0 01-.142.176l1.548 1.267zm-.067.074L15.642 5.46l1.414 1.415zm-.24.3c-.021.05-.034.055.028-.027.058-.077.142-.18.279-.347l-1.548-1.267c-.127.155-.24.294-.329.411a2.155 2.155 0 00-.268.442l1.838.789zm0 0l-1.838-.788a2 2 0 001.097 2.646l.741-1.857zm.482.049a12.787 12.787 0 01-.443-.049c-.102-.014-.089-.02-.039 0l-.741 1.858c.18.072.362.103.501.123.145.02.324.038.523.058l.2-1.99zm.609.097c-.207-.061-.434-.08-.609-.097l-.199 1.99c.117.012.18.018.225.024.041.006.034.007.01 0l.573-1.917zm1.39 1.536a2 2 0 00-1.39-1.536l-.574 1.916 1.964-.38zm.036.616c0-.176.005-.404-.036-.616l-1.964.38c-.005-.025-.003-.032-.001.01l.001.226h2zm0 1.053V9.474h-2v1.053h2zm-.036.615c.04-.212.036-.44.036-.615h-2l-.001.226c-.002.041-.004.034.001.009l1.964.38zm-1.39 1.536a2 2 0 001.39-1.536l-1.964-.38.574 1.916zm-.609.097c.175-.017.402-.036.609-.097l-.574-1.916c.025-.008.032-.007-.009-.001a7.27 7.27 0 01-.225.024l.2 1.99zm-.481.048c-.05.02-.063.015.038 0 .096-.013.228-.026.443-.048l-.199-1.99c-.199.02-.378.038-.523.058-.138.02-.32.05-.5.123l.74 1.857zm0 0l-.742-1.857a2 2 0 00-1.096 2.647l1.838-.79zm.306.375c-.137-.168-.221-.27-.279-.347-.062-.082-.049-.077-.027-.028l-1.838.79c.077.178.183.329.268.44.087.118.202.257.328.412l1.548-1.267zm-.067-.074l-1.414 1.414 1.414-1.414zm0 0l-1.414 1.415 1.414-1.415zm.428.573c-.102-.19-.25-.363-.36-.499l-1.549 1.267.142.175c.025.034.02.03.007.006l1.76-.949zm-.103 2.07a2 2 0 00.103-2.07l-1.76.95 1.657 1.12zm-.409.46c.124-.124.288-.282.41-.46l-1.658-1.12c.015-.022.02-.026-.008.005a7.516 7.516 0 01-.158.16l1.414 1.415zm-.745.745l.745-.745-1.414-1.414-.745.744 1.414 1.415zm-.46.409c.178-.12.336-.285.46-.41l-1.414-1.414a7.624 7.624 0 01-.16.159c-.031.028-.028.022-.006.008l1.12 1.657zm-2.07.103a2 2 0 002.07-.103l-1.12-1.657-.95 1.76zm-.499-.361c.136.11.31.259.5.361l.949-1.76c.023.012.027.018-.006-.007a7.669 7.669 0 01-.176-.142l-1.267 1.548zm.079.058l1.11-1.664-1.11 1.664zm-.086-.064l1.28-1.537-1.28 1.537zm-.368-.301c-.049-.021-.054-.034.028.027.077.058.18.142.347.28l1.267-1.548c-.155-.127-.294-.241-.411-.33a2.157 2.157 0 00-.442-.267l-.789 1.838zm0 0l.79-1.838a2 2 0 00-2.647 1.096l1.857.742zm-.048.482c.022-.216.035-.348.049-.443.014-.102.02-.089 0-.04l-1.858-.74c-.072.18-.103.362-.123.5-.02.146-.038.325-.058.524l1.99.2zm-.097.609c.061-.207.08-.434.097-.609l-1.99-.199c-.011.117-.018.18-.024.225-.006.041-.007.034 0 .01l1.917.573zm-1.536 1.39a2 2 0 001.536-1.39l-1.916-.574.38 1.964zm-.616.036c.176 0 .404.005.616-.036l-.38-1.964c.025-.005.032-.003-.01-.001l-.226.001v2zm-1.052 0h1.052v-2H9.474v2zm-.616-.036c.212.04.44.036.616.036v-2l-.227-.001c-.041-.002-.034-.004-.009.001l-.38 1.964zm-1.536-1.39a2 2 0 001.536 1.39l.38-1.964-1.916.574zm-.097-.609c.017.175.036.402.097.609l1.916-.574c.008.025.007.032.001-.009a7.602 7.602 0 01-.024-.225l-1.99.2zm.009.065l1.972-.329-1.972.33zm0 0l1.972-.329-1.972.33zm-.057-.547c-.02-.05-.015-.062 0 .039.013.096.026.227.048.443l1.99-.199c-.02-.199-.038-.378-.058-.523-.02-.139-.05-.32-.123-.502l-1.857.742zm0 0l1.857-.742a2 2 0 00-2.646-1.096l.789 1.838zm-.375.307c.168-.137.27-.221.347-.28.082-.06.077-.048.028-.027l-.79-1.838a2.16 2.16 0 00-.44.268c-.118.088-.257.202-.412.33l1.267 1.547zm-.5.361c.19-.102.364-.25.5-.361l-1.267-1.548c-.09.074-.14.114-.176.142-.033.025-.029.02-.006.007l.95 1.76zm-2.069-.103a2 2 0 002.07.103l-.95-1.76-1.12 1.657zm-.46-.409c.124.124.282.288.46.41l1.12-1.658c.022.015.025.02-.005-.008a7.518 7.518 0 01-.161-.158l-1.414 1.414zm-.745-.745l.745.745 1.414-1.414-.745-.745-1.414 1.414zm-.41-.46c.121.178.286.336.41.46l1.414-1.414a7.581 7.581 0 01-.158-.16c-.029-.031-.023-.028-.008-.006l-1.657 1.12zm-.102-2.07a2 2 0 00.103 2.07l1.657-1.12-1.76-.95zm.361-.499c-.111.136-.26.31-.361.5l1.76.949c-.012.023-.018.027.007-.006.028-.037.068-.086.142-.176l-1.548-1.267zm-.014.018l1.576 1.231-1.576-1.231zm.02-.025l1.536 1.28-1.536-1.28zm.3-.368c.022-.049.035-.054-.027.028-.058.077-.142.18-.279.347l1.548 1.267c.127-.155.24-.294.329-.411.084-.112.19-.263.268-.442l-1.838-.789zm0 0l1.839.79a2 2 0 00-1.096-2.647l-.742 1.857zm-.481-.048c.216.022.348.035.443.049.101.014.089.02.039 0l.742-1.858a2.16 2.16 0 00-.502-.123c-.145-.02-.324-.038-.523-.058l-.2 1.99zm-.064-.008l.326-1.973-.326 1.973zm-.545-.09c.207.063.434.08.609.098l.199-1.99a7.273 7.273 0 01-.225-.024c-.041-.006-.034-.007-.01 0l-.573 1.917zm-1.39-1.535a2 2 0 001.39 1.536l.574-1.916-1.964.38zm-.036-.615c0 .175-.005.403.036.615l1.964-.38c.005.025.003.032.001-.01a7.652 7.652 0 01-.001-.226h-2zm0-1.053v1.053h2V9.474h-2zm.036-.616c-.04.212-.036.44-.036.616h2l.001-.227c.002-.041.004-.034-.001-.009l-1.964-.38zm1.39-1.536a2 2 0 00-1.39 1.536l1.964.38-.574-1.916zm.609-.097c-.175.017-.402.036-.609.097l.574 1.916c-.025.008-.032.007.009.001.046-.006.108-.012.225-.024l-.2-1.99zm.033-.003l.133 1.996-.133-1.996zm.45-.045c.049-.02.062-.015-.04 0a12.76 12.76 0 01-.443.048l.199 1.99c.199-.02.378-.038.523-.058.139-.02.321-.05.502-.123l-.742-1.857zm0 0l.741 1.857a2 2 0 001.096-2.646l-1.838.789zM2.876 6.8c.138.168.221.271.28.348.061.082.048.077.027.028l1.838-.789a2.155 2.155 0 00-.268-.442c-.088-.117-.202-.256-.329-.411L2.877 6.801zm-.026-.033l1.6-1.2-1.6 1.2zm-.335-.466c.102.19.25.363.361.5l1.548-1.267a7.678 7.678 0 01-.142-.176c-.025-.033-.02-.029-.007-.006l-1.76.949zm.103-2.069a2 2 0 00-.103 2.069l1.76-.95-1.657-1.119zm.41-.46c-.125.123-.29.281-.41.46l1.657 1.12c-.015.021-.02.025.008-.005.031-.034.076-.079.158-.162L3.028 3.772zm.744-.745l-.745.744 1.414 1.414.745-.744-1.414-1.414zm.46-.41c-.178.121-.336.286-.46.41l1.414 1.414.16-.159c.031-.028.028-.022.006-.007l-1.12-1.658zm2.07-.103a2 2 0 00-2.07.103l1.12 1.658.95-1.76zm.499.362c-.136-.112-.31-.26-.5-.362l-.949 1.76c-.023-.012-.027-.018.006.008.037.028.086.067.176.142l1.267-1.548zm.375.306c.049.022.054.035-.028-.027-.077-.058-.18-.142-.347-.28L5.535 4.426c.155.126.294.24.411.328.112.085.263.191.442.268l.789-1.838zm0 0l-.79 1.838a2 2 0 002.647-1.096l-1.857-.742zm.048-.481c-.022.215-.035.347-.049.443-.014.101-.02.088 0 .038l1.858.742c.072-.18.103-.363.123-.501.02-.145.038-.324.058-.523l-1.99-.2zm.097-.609c-.061.207-.08.434-.097.609l1.99.199c.012-.117.018-.18.024-.225.006-.041.007-.034 0-.01l-1.917-.573zM8.858.703a2 2 0 00-1.536 1.39l1.916.574-.38-1.964zm.615-.036c-.175 0-.403-.005-.615.036l.38 1.964c-.025.005-.032.003.01.001a7.69 7.69 0 01.225-.001v-2zm1.053 0H9.474v2h1.053v-2zm.616.036c-.212-.04-.44-.036-.615-.036v2l.226.001c.041.002.034.004.009-.001l.38-1.964zm1.536 1.39a2 2 0 00-1.536-1.39l-.38 1.964 1.916-.574zM12.333 10A2.333 2.333 0 0110 12.333v2A4.333 4.333 0 0014.333 10h-2zM10 7.667A2.333 2.333 0 0112.333 10h2A4.333 4.333 0 0010 5.667v2zM7.667 10A2.333 2.333 0 0110 7.667v-2A4.333 4.333 0 005.667 10h2zM10 12.333A2.333 2.333 0 017.667 10h-2A4.333 4.333 0 0010 14.333v-2z'
      ></path>
    </svg>
  );
}

export default Setting;
