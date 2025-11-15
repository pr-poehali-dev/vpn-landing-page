import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Server {
  id: number;
  name: string;
  country: string;
  online: boolean;
  ping: number;
}

const mockServers: Server[] = [
  { id: 1, name: 'Москва', country: 'RU', online: true, ping: 12 },
  { id: 2, name: 'Амстердам', country: 'NL', online: true, ping: 45 },
  { id: 3, name: 'Нью-Йорк', country: 'US', online: true, ping: 120 },
  { id: 4, name: 'Токио', country: 'JP', online: true, ping: 180 },
  { id: 5, name: 'Сингапур', country: 'SG', online: true, ping: 140 },
  { id: 6, name: 'Лондон', country: 'GB', online: true, ping: 55 },
];

const Index = () => {
  const [servers, setServers] = useState<Server[]>(mockServers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/9e5f2f61-53c4-49df-ae73-28f620b39bdd');
        const data = await response.json();
        setServers(data.servers || mockServers);
      } catch (error) {
        setServers(mockServers);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
    const interval = setInterval(fetchServers, 30000);
    return () => clearInterval(interval);
  }, []);

  const onlineServers = servers.filter(s => s.online).length;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/files/caf99853-1a3d-412f-9b12-49dda7fcfae1.jpg" alt="TeeVPN" className="h-8" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('servers')} className="text-sm font-medium hover:text-primary transition-colors">Серверы</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="https://t.me/teevpn_bot" target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={16} className="mr-2" />
              Телеграм
            </a>
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="mb-8 flex justify-center">
            <img src="https://cdn.poehali.dev/files/caf99853-1a3d-412f-9b12-49dda7fcfae1.jpg" alt="TeeVPN" className="h-32 md:h-40" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Свобода в сети
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Быстрый и надёжный VPN сервис с серверами по всему миру
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
              <a href="https://t.me/teevpn_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={20} className="mr-2" />
                Начать использовать
              </a>
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('pricing')} className="text-lg px-8 py-6">
              Смотреть тарифы
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-center">
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-primary">{servers.length}</div>
              <div className="text-sm text-muted-foreground">Серверов</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-secondary">{onlineServers}</div>
              <div className="text-sm text-muted-foreground">Онлайн</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-accent">99.9%</div>
              <div className="text-sm text-muted-foreground">Аптайм</div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Тарифы</h2>
          <p className="text-center text-muted-foreground mb-12">Выберите подходящий план</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Месяц</CardTitle>
                <CardDescription>Попробуйте сервис</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">199₽</span>
                  <span className="text-muted-foreground">/мес</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Все серверы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Безлимитный трафик</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">3 устройства</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <a href="https://t.me/teevpn_bot" target="_blank" rel="noopener noreferrer">
                    Выбрать
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">Популярный</Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Полгода</CardTitle>
                <CardDescription>Выгодное предложение</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">899₽</span>
                  <span className="text-muted-foreground">/6 мес</span>
                  <div className="text-sm text-secondary mt-1">150₽/мес</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Все серверы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Безлимитный трафик</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">5 устройств</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Приоритетная поддержка</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <a href="https://t.me/teevpn_bot" target="_blank" rel="noopener noreferrer">
                    Выбрать
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-accent transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl">Год</CardTitle>
                <CardDescription>Максимальная экономия</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">1499₽</span>
                  <span className="text-muted-foreground">/год</span>
                  <div className="text-sm text-accent mt-1">125₽/мес</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Все серверы</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">Безлимитный трафик</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">10 устройств</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span className="text-sm">VIP поддержка 24/7</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <a href="https://t.me/teevpn_bot" target="_blank" rel="noopener noreferrer">
                    Выбрать
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="servers" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наши серверы</h2>
          <p className="text-center text-muted-foreground mb-12">
            {loading ? 'Загрузка...' : `${onlineServers} из ${servers.length} серверов онлайн`}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {servers.map((server, index) => (
              <Card key={server.id} className="border-border hover:border-primary transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        {server.country === 'RU' && '🇷🇺'}
                        {server.country === 'NL' && '🇳🇱'}
                        {server.country === 'US' && '🇺🇸'}
                        {server.country === 'JP' && '🇯🇵'}
                        {server.country === 'SG' && '🇸🇬'}
                        {server.country === 'GB' && '🇬🇧'}
                      </div>
                      <div>
                        <div className="font-semibold">{server.name}</div>
                        <div className="text-sm text-muted-foreground">{server.country}</div>
                      </div>
                    </div>
                    <Badge variant={server.online ? 'default' : 'destructive'} className={server.online ? 'bg-primary' : ''}>
                      {server.online ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse-slow" />
                          Онлайн
                        </div>
                      ) : 'Офлайн'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Gauge" size={16} />
                    <span>Пинг: {server.ping}ms</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Частые вопросы</h2>
          <p className="text-center text-muted-foreground mb-12">Ответы на популярные вопросы</p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">Как начать использовать TeeVPN?</AccordionTrigger>
              <AccordionContent>
                Просто откройте наш телеграм-бот @teevpn_bot, выберите подходящий тариф и следуйте инструкциям. Настройка занимает меньше минуты!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">На каких устройствах работает TeeVPN?</AccordionTrigger>
              <AccordionContent>
                TeeVPN работает на всех популярных платформах: iOS, Android, Windows, macOS и Linux. Количество устройств зависит от выбранного тарифа.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Есть ли ограничения по трафику?</AccordionTrigger>
              <AccordionContent>
                Нет! Все наши тарифы предоставляют безлимитный трафик. Вы можете пользоваться VPN без ограничений.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Какие способы оплаты вы принимаете?</AccordionTrigger>
              <AccordionContent>
                Мы принимаем банковские карты, электронные кошельки и криптовалюту. Все платежи проходят через защищённые каналы.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">Можно ли вернуть деньги?</AccordionTrigger>
              <AccordionContent>
                Да, у нас есть гарантия возврата средств в течение 7 дней, если сервис вам не подошёл. Просто напишите в поддержку.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-muted-foreground mb-8">Свяжитесь с нами в телеграм-боте</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="https://t.me/teevpn_bot" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" size={20} className="mr-2" />
                Открыть бот
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://teevpn.ru" target="_blank" rel="noopener noreferrer">
                <Icon name="Globe" size={20} className="mr-2" />
                teevpn.ru
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <div className="mb-4">
            <img src="https://cdn.poehali.dev/files/caf99853-1a3d-412f-9b12-49dda7fcfae1.jpg" alt="TeeVPN" className="h-8 mx-auto mb-2" />
          </div>
          <p>© 2024 TeeVPN. Все права защищены.</p>
          <p className="mt-2">Быстрый и безопасный доступ к интернету</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;