import React from 'react'

interface Props {
    children: React.ReactNode;
    title?: string;
}

const Wrapper: React.FC<Props> = ({ children }) => {
    const langArr = ['Kz', 'Ru']
    const [language, setLanguage] = React.useState(1)

    return (
        <div className='wrapper'>
            <div className='wrapper__header'>
                <div className='wrapper__language'>
                    {langArr.map((item, index) => <span className={language == index ? 'wrapper__language--chosen' : ''} onClick={() => setLanguage(index)}>{item}</span>)}
                </div>
                <div className='wrapper__title'>
                    <img src="/assets/images/Logo.png" alt="" />
                    <div className='wrapper__title--text'>
                        <h3>МОНИТОРИНГ РЫБ И ДРУГИХ ВОДНЫХ ЖИВОТНЫХ</h3>
                        <p>Министерство экологогии, геологии и природных ресурсов Республики казахстан</p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Wrapper